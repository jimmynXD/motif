import * as Comlink from "comlink";
import { uiEndpoint } from "@labxd/comlink-figma";

import * as services from "./services";

const main = () => {
  Comlink.expose(services, uiEndpoint());

  figma.showUI(__html__, { themeColors: true, height: 300 });
};

main();
