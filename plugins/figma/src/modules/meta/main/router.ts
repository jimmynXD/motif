import { router } from "./trpc"
import { authRouter as auth } from "@/auth/main"
import { tokenRouter as token } from "@/tokens/main/router"
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server"

export const figmaRouter = router({
  auth,
  token,
})

export type AppRouter = typeof figmaRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
