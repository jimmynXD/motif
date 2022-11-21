import { getXataClient } from "../../db/api"
import { inferAsyncReturnType } from "@trpc/server"
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

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await unstable_getServerSession(req, res, options)

  return {
    req,
    res,
    user: session?.user,
    xata: getXataClient(),
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
