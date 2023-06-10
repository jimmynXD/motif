import { DiffStateUI, LoadingUI, TopNav } from "@/meta/ui"
import { FC, Suspense } from "react"
import { TokenBottomNav } from "../components"
import { Outlet } from "react-router-dom"
import { PageLayout } from "../containers"
import { ErrorBoundary } from "react-error-boundary"

export const TokenPage: FC = () => {
  return (
    <PageLayout bottomNav={<TokenBottomNav />}>
      <TopNav>
        <ErrorBoundary
          fallback={<DiffStateUI subMsg="Try Reloading.">Error</DiffStateUI>}
        >
          <Suspense fallback={<LoadingUI />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </TopNav>
    </PageLayout>
  )
}
