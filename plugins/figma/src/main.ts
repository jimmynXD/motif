import { exposeMainServices } from "@labxd/comlink-figma"
import { createFigmaHandler } from "trpc-figma/adapter"

import { linkedServices } from "@/meta/main"
import { figmaRouter as router } from "@/meta/main/router"
import { createContext } from "@/meta/main/context"

const main = () => {
  exposeMainServices(linkedServices)

  createFigmaHandler({
    router,
    createContext,
  })

  figma.showUI(__html__, {
    width: 400,
    height: 600,
    position: { x: 0, y: 0 },
  })
}

main()
