import "./styles/globals.css"
import React from "react"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { DeployPage } from "@/deploy/pages"
import { TokenPage } from "@/tokens/pages"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom"

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route index path="/" element={<TokenPage />} />
          <Route path="deploy" element={<DeployPage />} />
        </Routes>
      </Router>

      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
