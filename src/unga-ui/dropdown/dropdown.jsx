import { useEffect, useRef, useState } from "react";
import { animate, createScope } from "animejs";

function DropdownItem({ name = "Option", key = "dropdown", onClick }) {
  return (
    <li
      className="collapse-item"
      onClick={onClick}
      tabIndex={0}
      key={`tagdrop_${key}_${name}`}
    >
      {name}
    </li>
  );
}

export function Dropdown(
  { default_value = "Default", form_name = "option", options },
) {
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState(default_value);

  const root = useRef(null);
  const scope = useRef(null);

  const handle_click = () => {
    if (!isOpened) {
      scope.current.methods.dropdownReveal();
    } else {
      scope.current.methods.dropdownClose();
    }

    setIsOpened(!isOpened);
  };

  const handle_item_click = (e) => {
    setValue(e.target.innerText);

    scope.current.methods.dropdownClose();
  };

  useEffect(() => {
    scope.current = createScope({ root }).add((self) => {
      self.add("dropdownReveal", () => {
        animate(".dropdown-trigger-arrow", {
          rotate: {
            to: "180deg",
            ease: "inOutQuad",
            duration: 300,
          },
        });

        animate(".dropdown-items", {
          "max-height": {
            to: "1080px",
            ease: "inOutQuart",
            duration: 300,
          },
        });
      });

      self.add("dropdownClose", () => {
        animate(".dropdown-trigger-arrow", {
          rotate: {
            to: "0deg",
            ease: "inOutQuad",
            duration: 300,
          },
        });

        animate(".dropdown-items", {
          "max-height": {
            to: "0px",
            ease: "inOutQuart",
            duration: 300,
          },
        });
      });
    });
  }, []);

  return (
    <div className="collapse-root" ref={root}>
      <input
        className="hidden-input"
        type="text"
        autoComplete="off"
        name={form_name}
        value={value}
      />
      <div className="dropdown-trigger" onClick={handle_click}>
        <p className="dropdown-trigger-title">{value}</p>
        <p className="dropdown-trigger-arrow">^</p>
      </div>
      <ul className="dropdown-items">
        <DropdownItem
          onClick={handle_item_click}
          name={default_value}
          key="dropdown_default_value"
        />
        {options.map((option, index) => (
          <DropdownItem
            onClick={handle_item_click}
            name={option}
            key={`dropdown_${index}`}
          />
        ))}
      </ul>
    </div>
  );
}
