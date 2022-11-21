// pages/api/trpc-playground.ts
import { NextApiHandler } from "next"
import { appRouter } from "@/meta/api/routes"
import { nextHandler } from "trpc-playground/handlers/next"

const setupHandler = nextHandler({
  router: appRouter,
  // tRPC api path, pages/api/trpc/[trpc].ts in this case
  trpcApiEndpoint: "/api/v0/trpc",
  playgroundEndpoint: "/api/v0/trpc-playground",
  // uncomment this if you're using superjson
  // request: {
  //   superjson: true,
  // },
})

const handler: NextApiHandler = async (req, res) => {
  const playgroundHandler = await setupHandler
  await playgroundHandler(req, res)
}

export default handler
