import "./main.css";
import reactLogo from "./assets/react.svg";
import Accordion from "./nero-ui/accordion/accordion.jsx";

function App() {
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
      <h1>Nero-UI is done with Deno + Vite + React</h1>
      <div className="testbed">
        <div className="testbed-item">
          <Accordion />
        </div>
        <div className="testbed-item">
          <h1>NeroUI</h1>
        </div>
        <div className="testbed-item">
          <h1>NeroUI</h1>
        </div>
        <div className="testbed-item">
          <h1>NeroUI</h1>
        </div>
      </div>
    </>
  );
}

export default App;
