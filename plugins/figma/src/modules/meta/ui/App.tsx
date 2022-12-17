import "./styles/globals.css"

import { DeployPage, SuccessPage } from "@/deploy/ui"
import { TokenPage } from "@/tokens/ui"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import { TRPCProvider } from "./TRPCProvider"
import { FC } from "react"
import {
  AuthenticatedLayout,
  LoginPage,
  HandleLogin,
  LoginFailure,
} from "@/auth/ui"

const App: FC = () => {
  return (
    <Router>
      <TRPCProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <Routes>
          <Route path="/" element={<AuthenticatedLayout />}>
            <Route index element={<TokenPage />} />
            <Route path="deploy" element={<DeployPage />}>
              <Route path="success" element={<SuccessPage />} />
            </Route>
          </Route>

          <Route path="auth" element={<Outlet />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="login/failure" element={<LoginFailure />} />
            <Route path="login/:token" element={<HandleLogin />} />
          </Route>
        </Routes>
      </TRPCProvider>
    </Router>
  )
}

export default App
