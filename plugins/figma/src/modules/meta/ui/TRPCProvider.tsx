import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { FC, ReactNode, useState } from "react"
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

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
          // optional
          /* headers() { */
          /*   return { */
          /*     authorization: getAuthCookie(), */
          /*   }; */
          /* }, */
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
