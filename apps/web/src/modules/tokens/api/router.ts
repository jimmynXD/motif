import { publicProcedure, router } from "../../meta/api"
import { tokensService, publishManyTokensArgs } from "./service"

export const tokenRouter = router({
  publishMany: publicProcedure
    .input(publishManyTokensArgs)
    .mutation(async ({ ctx, input }) => {
      try {
        return tokensService.publishManyTokens({ ctx, input })
      } catch (error) {
        console.error(error)
      }
    }),
})
