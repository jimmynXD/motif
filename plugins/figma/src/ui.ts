import { createElement } from "react";
import { createRoot } from "react-dom/client";
import App from "@/meta/ui/App";

const container = document.getElementById("motifxd-panel");

if (container) {
  const root = createRoot(container);

  root.render(createElement(App));
}
