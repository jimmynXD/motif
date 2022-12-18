import { exposeMainServices } from "@labxd/comlink-figma"
import { createFigmaHandler } from "trpc-figma"

import { linkedServices } from "@/meta/main"
import { figmaRouter } from "@/meta/main/router"
import { createContext } from "@/meta/main/context"

const main = () => {
  exposeMainServices(linkedServices)

  createFigmaHandler({
    router: figmaRouter,
    createContext,
  })

  figma.showUI(__html__, {
    width: 400,
    height: 600,
    position: { x: 0, y: 0 },
  })
}

main()
