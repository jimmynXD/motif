import { mainServices, trpc } from "@/meta/ui"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, FC, ReactNode, Suspense, useContext } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"

export const getToken = async (): Promise<string> =>
  mainServices.meta.storage.get("auth.api-key")

export const AuthContext = createContext<{ apiKey: string } | null>(null)

export const useAuth = (
  suspense = false,
  onError?: () => void | Promise<void>
) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const onErrorHandler = () => navigate("/auth/login", { replace: true })
  const _onError = onError ?? onErrorHandler

  const { data: apiKey, ...apiKeyQuery } = useQuery(
    ["auth.api-key"],
    getToken,
    {
      suspense,
      initialData: () =>
        queryClient.getQueryData(["api.auth-key"]) ?? undefined,
    }
  )

  const meQuery = trpc.user.me.useQuery(undefined, {
    suspense,
    enabled: !!apiKey,
    initialData: () => queryClient.getQueryData(["user", "me"]),
  })

  const isLoading = apiKeyQuery.isLoading || meQuery.isLoading

  const error = apiKeyQuery.error || meQuery.error

  const logout = async () => {
    mainServices.meta.storage.delete("auth.api-key")
    navigate("/auth/login", { replace: true })
  }

  return { data: meQuery.data, isLoading, error, logout }
}

type AuthContainerRenderFn = (args: ReturnType<typeof useAuth>) => ReactNode

export const AuthContainer: FC<{ children: AuthContainerRenderFn }> = ({
  children,
}) => {
  const authArgs = useAuth(true)

  return <>{children(authArgs)}</>
}

export const AuthenticatedLayout: FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <ErrorBoundary
        fallback={<h1>error auth</h1>}
        onError={() => navigate("/auth/login", { replace: true })}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AuthContainer>
            {({ logout }) => (
              <div>
                <button onClick={logout}>Log Out</button>
                <Outlet />
              </div>
            )}
          </AuthContainer>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
