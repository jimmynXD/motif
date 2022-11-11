import { z } from "zod"
import { mergeRouters, publicProcedure, router } from "./_app"

export const testRoutes = router({
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

export const appRouter = mergeRouters(testRoutes)

// export type definition of API
export type AppRouter = typeof appRouter
