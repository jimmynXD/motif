import { publicProcedure, router } from "@/meta/main"
import { z } from "zod"
import { genFrame, genPage } from "./generateService"
import { deleteColorToken, deleteTextToken } from "./deleteService"
import { getTypes } from "./typographyService"
import { getColors } from "./colorService"
import { createColorToken, createTextToken } from "./createTokenService"
import { updateColorToken, updateTextToken } from "./editTokenService"
import {
  updateMismatchedColorTokens,
  updateMismatchedTextTokens,
} from "./updateService"

export const tokenRouter = router({
  getTokens: publicProcedure.query(async () => {
    genPage()
    genFrame("Colors", "HORIZONTAL", 3000, 0)
    genFrame("Typography", "VERTICAL", 2000, 0)
    updateMismatchedColorTokens("Colors")
    updateMismatchedTextTokens("Typography")
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
  updateText: publicProcedure
    .input(
      z.object({
        inputValue: z.string(),
        id: z.string(),
        family: z.string(),
        style: z.string(),
        fontSize: z.number(),
        lineHeight: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return updateTextToken(
        input.inputValue,
        input.id,
        input.family,
        input.style,
        input.fontSize,
        input.lineHeight
      )
    }),
  updateMismatchTextTokens: publicProcedure.mutation(async () => {
    updateMismatchedTextTokens("Typography")
  }),
  deleteTextToken: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      deleteTextToken("Typography", input.id)
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
  updateColor: publicProcedure
    .input(
      z.object({
        inputValue: z.string(),
        id: z.string(),
        color: z.object({
          a: z.number().optional(),
          r: z.number(),
          g: z.number(),
          b: z.number(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      return updateColorToken(input.inputValue, input.id, input.color)
    }),
  updateMismatchColorTokens: publicProcedure.mutation(async () => {
    updateMismatchedColorTokens("Colors")
  }),
  deleteColorToken: publicProcedure
    .input(
      z.object({
        name: z.string(),
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      deleteColorToken("Colors", input.id)
    }),
})
