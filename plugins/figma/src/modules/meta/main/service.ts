import { createMainService } from "@/comlinkFigma"

export const service = {
  close: () => {
    figma.closePlugin()
  },
  resize: (width: number, height: number) => {
    figma.ui.resize(width, height)
  },
}
export default createMainService(service)
