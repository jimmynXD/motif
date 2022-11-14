import { appRouter, runExpressMiddleware } from "@/meta/api"
import * as trpcNext from "@trpc/server/adapters/next"
import Cors from "cors"
import type { NextApiRequest, NextApiResponse } from "next"

const cors = Cors()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runExpressMiddleware(req, res, cors)

  return trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
  })(req, res)
}

export default handler
