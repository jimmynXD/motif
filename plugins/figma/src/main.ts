import { exposeMainServices } from "@labxd/comlink-figma"

import { linkedServices } from "@/meta/main"

const main = () => {
  exposeMainServices(linkedServices)

  figma.showUI(__html__, {
    themeColors: true,
    width: 400,
    height: 600,
    position: { x: 0, y: 0 },
  })
}

main()
