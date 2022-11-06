import * as Comlink from "comlink";
import { mainEndpoint } from "@labxd/comlink-figma";
import { MainServices } from "@/shared/types";

export const mainServices = Comlink.wrap<MainServices>(
  mainEndpoint({
    pluginId: "sdhhskdjh980uhi",
  })
);

export default mainServices;
