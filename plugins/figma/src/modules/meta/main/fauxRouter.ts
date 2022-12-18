import { appRouter as apiRouter } from "web/api"
import { router } from "./trpc"
import { figmaRouter } from "./router"

export const appRouter = router({
  figma: figmaRouter,
  api: apiRouter,
})

export type AppRouter = typeof appRouter
