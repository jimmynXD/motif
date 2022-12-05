import { getXataClient } from "../../db/api"
import { inferAsyncReturnType, TRPCError } from "@trpc/server"
import type { CreateNextContextOptions } from "@trpc/server/adapters/next"
import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { options } from "@/auth/api"

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runExpressMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (...args: any[]) => any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export const getUserFromReq = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // user from session
  const session = await unstable_getServerSession(req, res, options)

  if (session?.user) return session.user

  // check if req is made with API key
  const key = req.headers["x-api-key"]
  if (typeof key !== "string") {
    return null
  }

  const keyRow = await getXataClient()
    .db.UserAPIKey.filter("key", key)
    .select(["user.*"])
    .getFirst()

  if (!keyRow) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      cause: "Invalid API key provided",
    })
  }

  return keyRow.user
}

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  return {
    req,
    res,
    user: await getUserFromReq(req, res),
    xata: getXataClient(),
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
