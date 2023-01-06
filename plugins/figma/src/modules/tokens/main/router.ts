import { publicProcedure, router } from "@/meta/main"
import { z } from "zod"
import { genColorTokens, genFrame, genPage } from "./generateService"
import {
  deleteColorToken,
  deleteTextToken,
  removeColorTokens,
  removeTypographyTokens,
} from "./removeService"
import { getTypes } from "./typographyService"
import { getColors } from "./colorService"
import { createColorToken, createTextToken } from "./createTokenService"
export const tokenRouter = router({
  getTokens: publicProcedure.query(async () => {
    genPage()
    genFrame("Colors", "HORIZONTAL", 3000, 0)
    genFrame("Typography", "VERTICAL", 2000, 0)
    return { typography: getTypes(), colors: getColors() }
  }),
  createText: publicProcedure
    .input(
      z.object({
        inputValue: z.string(),
        inputFamily: z.string(),
        inputWeight: z.string(),
        inputSize: z.number(),
        inputLineHeight: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      await createTextToken(
        "Typography",
        input.inputValue,
        input.inputFamily,
        input.inputWeight,
        input.inputSize,
        input.inputLineHeight
      )
    }),
  deleteMismatchTextTokens: publicProcedure.mutation(async () => {
    removeTypographyTokens(["Typography"])
  }),
  deleteTextToken: publicProcedure
    .input(
      z.object({
        name: z.string(),
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      deleteTextToken("Typography", input.name, input.id)
    }),
  createColor: publicProcedure
    .input(
      z.object({
        inputValue: z.string(),
        color: z.object({
          a: z.number().optional(),
          r: z.number(),
          g: z.number(),
          b: z.number(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      return createColorToken("Colors", input.inputValue, input.color)
    }),
  deleteMismatchColorTokens: publicProcedure.mutation(async () => {
    removeColorTokens(["Typography"])
  }),
  deleteColorToken: publicProcedure
    .input(
      z.object({
        name: z.string(),
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      deleteColorToken("Colors", input.name, input.id)
    }),
})
