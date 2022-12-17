import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { FC, ReactNode, useState } from "react"
import { figmaUiLink } from "trpc-figma"
import { RouterOutput } from "web/api"
import mainServices from "./mainService"
import { trpc } from "./trpc"

export const getUrl = () => {
  return "http://localhost:3000/api/v0/trpc"
}

export interface TRPCProviderProps {
  children: ReactNode
}

export const TRPCProvider: FC<TRPCProviderProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false },
        },
      })
  )

  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        // create a custom ending link
        (runtime) => {
          // initialize the different links for different targets
          const servers = {
            figma: figmaUiLink({ pluginId: "1176582292266618363" })(runtime),
            api: httpBatchLink({
              url: getUrl(),
              headers: async () => {
                try {
                  const res: RouterOutput["auth"]["createAPIKey"] =
                    await mainServices.meta.storage.get("auth.api-key")

                  return {
                    "x-api-key": res.key ?? "",
                  }
                } catch (error) {
                  console.info("error no api key", error)
                  return {}
                }
              },
              // optional
              /* headers() { */
              /*   return { */
              /*     authorization: getAuthCookie(), */
              /*   }; */
              /* }, */
            })(runtime),
          }
          return (ctx) => {
            const { op } = ctx
            // split the path by `.` as the first part will signify the server target name
            const pathParts = op.path.split(".")

            // first part of the query should be `server1` or `server2`
            const serverName =
              pathParts.shift() as string as keyof typeof servers

            // combine the rest of the parts of the paths
            // -- this is what we're actually calling the target server with
            const path = pathParts.join(".")
            console.log(`> calling ${serverName} on path ${path}`, {
              input: op.input,
            })

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
        },
      ],
    })
  })

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
