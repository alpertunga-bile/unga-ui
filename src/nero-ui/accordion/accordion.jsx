import { animate, createScope } from "animejs";
import { useEffect, useRef, useState } from "react";

export default function Accordion({children}) {
  const root = useRef(null);
  const scope = useRef(null);

  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    scope.current = createScope({ root }).add((self) => {
      self.add("accordionReveal", () => {
        animate(".accordion-arrow", {
          rotate: {
            to: "90deg",
            ease: "inOutQuad",
            duration: 300,
          }
        });

        animate(".accordion-item", {
          opacity: {
            to: 1,
            ease: "linear",
            duration: 500,
          }
        })
      });

      self.add("accordionClose", () => {
        animate(".accordion-arrow", {
          rotate: {
            to: "0deg",
            ease: "inOut",
            duration: 300,
          }
        });

        animate(".accordion-item", {
          opacity: {
            to: 0,
            ease: "inOutQuad",
            duration: 500,
          }
        })
      })
    });

    return () => scope.current.revert();
  }, []);

  const handle_click = () => {
    if(!isOpened) {
      scope.current.methods.accordionReveal();
    } else {
      scope.current.methods.accordionClose();
    }

    setIsOpened(!isOpened);
  }

  return (
    <div className="accordion-root" ref={root}>
      <div className="accordion-div" onClick={handle_click}>
        <p className="accordion-title">Accordion</p>
        <p className="accordion-arrow">{">"}</p>
      </div>
      <div className="accordion-item">
        {children}
      </div>
    </div>
  );
}
