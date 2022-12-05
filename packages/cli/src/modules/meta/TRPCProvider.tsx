import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import React, { FC, ReactNode, useState } from "react"
import { t } from "./trpc"

export const TRPCProvider: FC<{ children: ReactNode }> = (props) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    t.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/v0/trpc",
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
    <t.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* Your app here */}
        {props.children}
      </QueryClientProvider>
    </t.Provider>
  )
}
