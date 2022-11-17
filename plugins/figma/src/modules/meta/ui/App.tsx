import "./styles/globals.css"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

import { DeployPage, SuccessPage } from "@/deploy/ui/pages"
import { TokenPage } from "@/tokens/ui/pages"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import { TRPCProvider } from "./TRPCProvider"

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider>
        <Router>
          <Routes>
            <Route path="/" element={<TokenPage />} />
            <Route path="deploy" element={<DeployPage />}>
              <Route path="success" element={<SuccessPage />} />
            </Route>
          </Routes>
        </Router>
        <Outlet />
        <ReactQueryDevtools initialIsOpen={false} />
      </TRPCProvider>
    </QueryClientProvider>
  )
}

export default App
