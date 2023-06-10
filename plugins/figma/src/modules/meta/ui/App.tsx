import "./styles/globals.css"

import {
  DeployPage,
  EditProjectPage,
  NewProjectPage,
  ProjectSettings,
} from "@/deploy/ui"
import {
  ColorPage,
  EditColorPage,
  EditTextPage,
  NewColorPage,
  NewTextPage,
  TextPage,
  TokenPage,
} from "@/tokens/ui"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import { TRPCProvider } from "./TRPCProvider"
import { FC } from "react"
import { LoginPage, HandleLogin, LoginFailure, AuthLayout } from "@/auth/ui"
import { AnalyticsProvider } from "use-analytics"
import { analytics } from "./analytics"
import { InstructionPage } from "@/instruction/ui"

analytics.track("Booted up")

const App: FC = () => {
  return (
    <AnalyticsProvider instance={analytics}>
      <Router>
        <TRPCProvider>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          <Routes>
            <Route path="/" element={<TokenPage />}>
              <Route index element={<ColorPage />} />
              <Route path="text" element={<TextPage />} />
            </Route>
            <Route path="color/:name" element={<NewColorPage />} />
            <Route path="color/:name/:id" element={<EditColorPage />} />
            <Route path="text/:name" element={<NewTextPage />} />
            <Route path="text/:name/:id" element={<EditTextPage />} />
            <Route path="instruction" element={<InstructionPage />} />
            <Route path="deploy" element={<AuthLayout />}>
              <Route index element={<DeployPage />} />
            </Route>
            <Route
              path="deploy/new/:workspaceId"
              element={<NewProjectPage />}
            />
            <Route
              path="deploy/edit/:projectId/:name"
              element={<EditProjectPage />}
            />
            <Route
              path="deploy/setting/:workspaceId"
              element={<ProjectSettings />}
            />
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
