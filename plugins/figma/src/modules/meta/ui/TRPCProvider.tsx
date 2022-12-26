import { QueryClientProvider } from "@tanstack/react-query"
import { FC, ReactNode } from "react"
import { trpc, trpcClient, queryClient } from "./trpc"

export interface TRPCProviderProps {
  children: ReactNode
}

export const TRPCProvider: FC<TRPCProviderProps> = ({ children }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
