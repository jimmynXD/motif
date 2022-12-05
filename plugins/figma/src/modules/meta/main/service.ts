import { createMainService } from "@/comlinkFigma"
import { proxy } from "comlink"

export const service = {
  close: () => {
    figma.closePlugin()
  },
  resize: (width: number, height: number) => {
    figma.ui.resize(width, height)
  },
  storage: proxy({
    get: figma.clientStorage.getAsync,
    set: figma.clientStorage.setAsync,
    delete: figma.clientStorage.deleteAsync,
  }),
}
export default createMainService(service)
