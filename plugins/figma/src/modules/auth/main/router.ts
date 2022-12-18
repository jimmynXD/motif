import { publicProcedure, router } from "@/meta/main"
import { z } from "zod"

const API_KEY_STORAGE_KEY = "auth.api-key"

export const authRouter = router({
  saveAPIKey: publicProcedure
    .input(
      z.object({
        key: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { figma } }) => {
      return figma.clientStorage.setAsync(API_KEY_STORAGE_KEY, input)
    }),
  deleteAPIKey: publicProcedure.mutation(async ({ ctx: { figma } }) => {
    return figma.clientStorage.deleteAsync(API_KEY_STORAGE_KEY)
  }),
  getAPIKey: publicProcedure.query(async ({ ctx: { figma } }) => {
    return figma.clientStorage.getAsync(API_KEY_STORAGE_KEY)
  }),
})
