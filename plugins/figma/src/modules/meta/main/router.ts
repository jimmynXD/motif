import { initTRPC } from "@trpc/server"
import { z } from "zod"
import { appRouter as apiRouter } from "web/api"

const t = initTRPC.create()

export const figmaRouter = t.router({
  hello: t.procedure
    .input(
      z
        .object({
          text: z.string().nullish(),
        })
        .nullish()
    )
    .query((req) => {
      return `Hello ${req.input?.text}`
    }),
  hello2: t.procedure.mutation(() => {
    console.log(`Hello World!`)
  }),
})

export const appRouter = t.router({
  figma: figmaRouter,
  api: apiRouter,
})

export type AppRouter = typeof appRouter
