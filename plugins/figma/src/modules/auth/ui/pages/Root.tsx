import { mainServices } from "@/meta/ui"
import { useQuery } from "@tanstack/react-query"
import { FC, ReactNode, Suspense } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"

export const getToken = async (): Promise<string> =>
  mainServices.meta.storage.get("auth.token")

export const AuthContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: token } = useQuery(["auth.token"], getToken, {
    suspense: true,
  })

  return <>{children}</>
}

export const AuthenticatedLayout: FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <ErrorBoundary
        fallback={<h1>error</h1>}
        onError={() => navigate("/auth/login", { replace: true })}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AuthContainer>
            <Outlet />
          </AuthContainer>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
