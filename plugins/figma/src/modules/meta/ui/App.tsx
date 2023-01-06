import "./styles/globals.css"

import { DeployPage, SuccessPage } from "@/deploy/ui"
import {
  ColorPage,
  DefaultTextPage,
  NewColorPage,
  NewTextPage,
  TextPage,
  TokenPage,
} from "@/tokens/ui"
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
import { AnalyticsProvider } from "use-analytics"
import { analytics } from "./analytics"
import { InstructionPage } from "@/instruction/ui"

analytics.track("Booted up")

const App: FC = () => {
  return (
    <AnalyticsProvider instance={analytics}>
      <Router>
        <TRPCProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Routes>
            <Route path="/" element={<TokenPage />}>
              <Route index element={<ColorPage />} />
              <Route path="text" element={<TextPage />} />
            </Route>
            <Route path="color/new" element={<NewColorPage />} />
            <Route path="text/new" element={<NewTextPage />} />
            <Route path="text/default" element={<DefaultTextPage />} />
            <Route path="instruction" element={<InstructionPage />} />
            <Route path="auth" element={<AuthenticatedLayout />}>
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
    </AnalyticsProvider>
  )
}

export default App
