import { type AppRouter } from "web/api"
import { createTRPCJotai } from "jotai-trpc"
import { httpBatchLink, httpLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"

export const trpc = createTRPCJotai<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:3000/api/v0/trpc" })],
})

export const t = createTRPCReact<AppRouter>()
