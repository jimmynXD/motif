import { type NextApiHandler } from "next"

import { appRouter } from "@/meta/api/routes"
import { renderTrpcPanel } from "trpc-panel"

const handler: NextApiHandler = (_, res) => {
  res.send(
    renderTrpcPanel(appRouter, {
      url: "http://localhost:3000/api/v0/trpc",
    })
  )
}

export default handler
