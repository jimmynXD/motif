import { useQueryClient } from "@tanstack/react-query"
import { createContext, FC, ReactNode, Suspense } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { mainServices, trpc, DiffStateUI, LoadingIntroUI } from "@/meta/ui"
import { PageLayout } from "@/tokens/ui"
import { LogoutHandler } from "../components"

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
  const onErrorFn = onError ?? onErrorHandler

  const { data: apiKey, ...apiKeyQuery } = trpc.figma.auth.getAPIKey.useQuery(
    undefined,
    {
      onError: onErrorFn,
      suspense,
      initialData: () =>
        queryClient.getQueryData(["figma", "auth", "getAPIKey"]),
    }
  )

  const meQuery = trpc.api.user.me.useQuery(undefined, {
    suspense,
    enabled: !!apiKey,
    initialData: () => queryClient.getQueryData(["api", "user", "me"]),
  })
  const deleteAPIKeyMutation = trpc.figma.auth.deleteAPIKey.useMutation()

  const isLoading = apiKeyQuery.isLoading || meQuery.isLoading

  const error = apiKeyQuery.error || meQuery.error

  const logout = async () => {
    await deleteAPIKeyMutation.mutateAsync()
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

export const AuthLayout: FC = () => {
  const navigate = useNavigate()

  return (
    <PageLayout>
      <ErrorBoundary
        fallback={<DiffStateUI subMsg="Try Reloading." />}
        onError={() => navigate("/auth/login", { replace: true })}
      >
        <Suspense fallback={<LoadingIntroUI />}>
          <AuthContainer>
            {({ logout }) => (
              <>
                <Outlet />
                <LogoutHandler onClick={logout} />
              </>
            )}
          </AuthContainer>
        </Suspense>
      </ErrorBoundary>
    </PageLayout>
  )
}
