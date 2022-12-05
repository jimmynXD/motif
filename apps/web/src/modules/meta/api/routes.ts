import { z } from "zod"
import { publicProcedure, router } from "./_app"
import { tokenRouter } from "@/tokens/api"
import { projectRouter, userRouter, workspaceRouter } from "@/user/api"
import { authRouter } from "@/auth/api/router"
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
export const testRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      }
    }),
})

export const appRouter = router({
  test: testRouter,
  token: tokenRouter,
  user: userRouter,
  workspace: workspaceRouter,
  project: projectRouter,
  auth: authRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
