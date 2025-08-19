import { animate, createScope } from "animejs";
import { useEffect, useRef, useState } from "react";

export default function Accordion() {
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
            duration: 500,
          }
        });
      });

      self.add("accordionClose", () => {
        animate(".accordion-arrow", {
          rotate: {
            to: "0deg",
            ease: "inOutQuad",
            duration: 500,
          }
        })
      })
    });

    return () => scope.current.revert();
  }, []);

  const handle_click = () => {
    console.log("is clicked")

    if(!isOpened) {
      scope.current.methods.accordionReveal();
    } else {
      scope.current.methods.accordionClose();
    }

    setIsOpened(!isOpened);
  }

  return (
    <>
      <div className="accordion-div" ref={root} onClick={handle_click}>
        <p className="accordion-title">Accordion</p>
        <p className="accordion-arrow">{">"}</p>
      </div>
    </>
  );
}
