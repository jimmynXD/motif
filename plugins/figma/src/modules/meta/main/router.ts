import { router } from "./trpc"
import { authRouter as auth } from "@/auth/main"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"

export const figmaRouter = router({
  auth,
})

export type AppRouter = typeof figmaRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
