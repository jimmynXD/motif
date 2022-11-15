import { z } from "zod"
import { publicProcedure, router } from "./_app"
import { tokenRouter } from "../../tokens/api"

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
})

// export type definition of API
export type AppRouter = typeof appRouter
