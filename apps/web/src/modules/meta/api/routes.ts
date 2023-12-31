import { router } from "./_app"
import { tokenRouter } from "@/tokens/api"
import {
  productAnalyticsRouter,
  projectRouter,
  userRouter,
  workspaceRouter,
} from "@/user/api"
import { authRouter } from "@/auth/api/router"
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

export const appRouter = router({
  token: tokenRouter,
  user: userRouter,
  analytics: productAnalyticsRouter,
  workspace: workspaceRouter,
  project: projectRouter,
  auth: authRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
