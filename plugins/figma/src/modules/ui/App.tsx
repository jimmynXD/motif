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
            mainServices.createRectangle(Number(inputRef.current?.value || 0))
          }
        >
          Create
        </button>
        <button onClick={() => mainServices.test}>Log</button>
        <button onClick={() => mainServices.close()}>Cancel</button>
      </footer>
    </main>
  );
}

export default App;
