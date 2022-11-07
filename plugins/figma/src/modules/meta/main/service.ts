import { createMainService, Service } from "@/comlinkFigma";

export const service: Service = {
  close: () => {
    figma.closePlugin();
  },
};
export default createMainService(service);
