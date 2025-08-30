import { animate, createScope } from "animejs";
import { useEffect, useRef, useState } from "react";

export default function Accordion(
  { title = "Accordion", max_height = 2160, children },
) {
  const root = useRef(null);
  const scope = useRef(null);

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const accordion_animation_duration = 300;

    scope.current = createScope({ root }).add((self) => {
      self.add("accordionReveal", () => {
        animate(".accordion-arrow", {
          rotate: {
            to: "90deg",
            ease: "inOutQuad",
            duration: accordion_animation_duration,
          },
        });

        animate(".accordion-item", {
          opacity: {
            to: 1,
            ease: "easeIn",
            duration: accordion_animation_duration,
          },

          "max-height": {
            to: `${max_height}px`,
            ease: "inOutQuart",
            duration: accordion_animation_duration,
          },
        });
      });

      self.add("accordionClose", () => {
        animate(".accordion-arrow", {
          rotate: {
            to: "0deg",
            ease: "inOutQuad",
            duration: accordion_animation_duration,
          },
        });

        animate(".accordion-item", {
          opacity: {
            to: 0,
            ease: "easeOut",
            duration: accordion_animation_duration,
          },

          "max-height": {
            to: 0,
            ease: "inOutQuart",
            duration: accordion_animation_duration,
          },
        });
      });
    });

    return () => scope.current.revert();
  }, []);

  const handle_click = () => {
    if (!isOpened) {
      scope.current.methods.accordionReveal();
    } else {
      scope.current.methods.accordionClose();
    }

    setIsOpened(!isOpened);
  };

  return (
    <div className="collapse-root" ref={root}>
      <div className="accordion-div" onClick={handle_click}>
        <p className="accordion-title">{title}</p>
        <p className="accordion-arrow">{">"}</p>
      </div>
      <div className="accordion-item">
        {children}
      </div>
    </div>
  );
}
