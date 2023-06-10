import { createTRPCReact } from "@trpc/react-query"
import { type AppRouter } from "../main/fauxRouter"

import { AnyRouter } from "@trpc/server"
import { RouterOutput } from "web/api"
import {
  httpBatchLink,
  type TRPCLink,
  loggerLink,
  createTRPCProxyClient,
} from "@trpc/client"
import { QueryClient } from "@tanstack/react-query"

import mainServices from "./mainService"
import { figmaUiLink } from "trpc-figma/link"
export const trpc = createTRPCReact<
  AppRouter,
  unknown,
  "ExperimentalSuspense"
>()

const isDev = process.env.NODE_ENV === "development"

export const getUrl = () => {
  return isDev ? "http://localhost:3000/api/v0/trpc" : process.env.API_URL || ""
}

export const queryClient = new QueryClient()

const combineLinks = (): TRPCLink<AppRouter> => (runtime) => {
  // initialize the different links for different targets
  const servers = {
    figma: figmaUiLink({ pluginId: "1176582292266618363" })(runtime),
    api: httpBatchLink({
      url: getUrl(),
      headers: async () => {
        try {
          const res: RouterOutput["auth"]["createAPIKey"] =
            await mainServices.meta.storage.get("auth.api-key")

          if (!res?.key) return {}
          return {
            "x-api-key": res.key,
          }
        } catch (error) {
          console.info("error no api key", error)
          return {}
        }
      },
    })(runtime),
  }
  return (ctx) => {
    const { op } = ctx
    // split the path by `.` as the first part will signify the server target name
    const pathParts = op.path.split(".")

    // first part of the query should be `server1` or `server2`
    const serverName = pathParts.shift() as string as keyof typeof servers

    // combine the rest of the parts of the paths
    // -- this is what we're actually calling the target server with
    const path = pathParts.join(".")

    const link = servers[serverName]

    return link({
      ...ctx,
      op: {
        ...op,
        // override the target path with the prefix removed
        path,
      },
    })
  }
}

export const trpcClient = trpc.createClient({
  links: [loggerLink(), combineLinks()],
})

export const trpcProxyClient = createTRPCProxyClient<AppRouter>({
  links: [loggerLink(), combineLinks()],
})

export type TRPCProxyClient = typeof trpcProxyClient
