import { createMainService } from "@/comlinkFigma"

export const service = {
  close: () => {
    figma.closePlugin()
  },
}
export default createMainService(service)
