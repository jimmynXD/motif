import { linkedServices } from "@/meta/main";
import { exposeMainServices } from "@labxd/comlink-figma";

const main = () => {
  exposeMainServices(linkedServices);

  figma.showUI(__html__, { themeColors: true, height: 300 });
};

main();
