import { Context } from "../../meta/api"
import z from "zod"
import { ColorTokenRecord, TypographyTokenRecord } from "../../db/api"

export interface ServiceHandlerParams<T> {
  ctx: Context
  input: T
}

export type ServiceHandler<A, R> = (
  args: ServiceHandlerParams<A>
) => R | Promise<R>

export const colorTokenInput = z.object({
  name: z.string(),
  hex: z.string(),
  rgb: z.object({
    r: z.number(),
    g: z.number(),
    b: z.number(),
  }),
})

export type ColorTokenInput = z.infer<typeof colorTokenInput>

export const typographyTokenInput = z.object({
  name: z.string(),
  line: z.object({
    height: z.string().optional(),
    heightRelative: z.number().optional(),
  }),
  letterSpacing: z.number(),
  font: z.object({
    family: z.string(),
    weight: z.string(),
    size: z.number(),
  }),
})

export type TypographyTokenInput = z.infer<typeof typographyTokenInput>

export const publishManyTokensArgs = z.object({
  colorTokens: z.array(colorTokenInput).min(1),
  typographyTokens: z.array(typographyTokenInput).min(1),
})

export type PublishManyTokensArgs = z.infer<typeof publishManyTokensArgs>

export const publishManyTokensHanlder: ServiceHandler<
  PublishManyTokensArgs,
  {
    colorTokens: Pick<ColorTokenRecord, "id" | "name">[]
    typographyTokens: Pick<TypographyTokenRecord, "id" | "name">[]
  }
> = async ({ ctx, input }) => {
  const color = await ctx.xata.db.ColorToken.create(input.colorTokens)
  const typo = await ctx.xata.db.TypographyToken.create(input.typographyTokens)

  return {
    colorTokens: color.map(({ id, name }) => ({ id, name })),
    typographyTokens: typo.map(({ id, name }) => ({ id, name })),
  }
}

export const tokensService = {
  publishManyTokens: publishManyTokensHanlder,
}
