import "./main.css";
import reactLogo from "./assets/react.svg";
import Accordion from "./unga-ui/accordion/accordion.jsx";
import { Dropdown } from "./unga-ui/dropdown/dropdown.jsx";
import AutoComplete from "./unga-ui/autocomplete/autocomplete.jsx";
import Chip from "./unga-ui/chip/chip.jsx";

function App() {
  const auto_options = ["New York", "London", "Honk Kong"];

  return (
    <>
      <img src="/vite-deno.svg" alt="Vite with Deno" />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Unga-UI is built with Deno + Vite + React</h1>
      <div className="testbed">
        <div className="testbed-item">
          <Accordion>
            <p>Hello World</p>
          </Accordion>
        </div>
        <div className="testbed-item">
          <Dropdown options={["Option 1", "Option 2"]} />
        </div>
        <div className="testbed-item">
          <AutoComplete form_name="country" options={auto_options} />
        </div>
        <div className="testbed-item">
          <Chip name="Chip" onClick={() => alert("Hello There")} />
        </div>
      </div>
    </>
  );
}

export default App;
