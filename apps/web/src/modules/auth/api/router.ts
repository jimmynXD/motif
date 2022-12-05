import { publicProcedure, router } from "@/meta/api"
import { nanoid } from "nanoid"
import { z } from "zod"
import * as R from "remeda"
import addMin from "date-fns/addMinutes"
import { userProcedure } from "@/user/api/procedures"
import { XataClient } from "@/db/api"
import { TRPCError } from "@trpc/server"
import { v4 } from "uuid"

const isTokenValid = (xata: XataClient) => async (token: string) => {
  const tokenRow = await xata.db.UserAuthToken.filter("token", token).getFirst()

  if (!tokenRow || !tokenRow.expireAt) {
    return { valid: false }
  }

  return {
    valid: tokenRow.expireAt.getTime() > new Date().getTime(),
    id: tokenRow.id,
  }
}

export const authRouter = router({
  createToken: publicProcedure
    .input(
      z.object({
        deviceType: z.union([z.literal("cli"), z.literal("figma")]),
      })
    )
    .mutation(async ({ ctx }) => {
      const date = new Date()
      const res = await ctx.xata.db.UserAuthToken.create({
        token: nanoid(20),
        createdAt: date,
        expireAt: addMin(date, 10),
      })

      return R.pick(res, ["token", "createdAt", "expireAt"])
    }),
  updateTokenWithUser: userProcedure
    .input(
      z.object({
        token: z.string().min(20).max(20),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isValid = await isTokenValid(ctx.xata)(input.token)

      if (!isValid.valid || !isValid.id) {
        throw new TRPCError({ code: "BAD_REQUEST", cause: "Token not valid" })
      }

      const res = await ctx.xata.db.UserAuthToken.update({
        id: isValid.id,
        user: {
          id: ctx.user.id,
        },
      })

      if (!res) {
        throw new TRPCError({ code: "BAD_REQUEST", cause: "Token not valid" })
      }

      return R.pick(res, ["token", "createdAt", "expireAt"])
    }),
  createAPIKey: publicProcedure
    .input(
      z.object({
        token: z.string().min(20).max(20),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const isValid = await isTokenValid(ctx.xata)(input.token)
      if (!isValid.valid || !isValid.id) {
        throw new TRPCError({ code: "BAD_REQUEST", cause: "Token not valid" })
      }

      const tokenRow = await ctx.xata.db.UserAuthToken.select(["user.id"])
        .filter("id", isValid.id)
        .getFirst()

      if (!tokenRow?.user?.id) {
        throw new TRPCError({ code: "BAD_REQUEST", cause: "Token not" })
      }

      const dates = {
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const res = await ctx.xata.db.UserAPIKey.create({
        key: v4(),
        user: {
          id: tokenRow.user.id,
        },
        ...dates,
      })

      return R.pick(res, ["key", "createdAt", "updatedAt"])
    }),
})
