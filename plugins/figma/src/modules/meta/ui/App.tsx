import * as React from "react";
import "./style/globals.css";
import mainServices from "./mainService";

declare function require(path: string): any;

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <main>
      <header>
        <img src={require("./logo.svg")} />
        <h2>Rectangle Creator</h2>
      </header>
      <section>
        <input id="input" type="number" min="0" ref={inputRef} />
        <label htmlFor="input">Rectangle Count</label>
      </section>
      <footer>
        <button
          className="brand"
          onClick={() =>
            mainServices.test.createRectangle(
              Number(inputRef.current?.value || 0)
            )
          }
        >
          Createee
        </button>
        <button onClick={() => mainServices.test.log("Hello World")}>
          Log
        </button>
        <button onClick={() => mainServices.meta.close()}>Cancel</button>
      </footer>
    </main>
  );
}

export default App;
