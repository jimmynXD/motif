import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, FC, ReactNode, Suspense } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import clsx from "clsx"
import { mainServices, trpc, DiffStateUI, LoadingIntroUI } from "@/meta/ui"
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
        fallback={<DiffStateUI />}
        onError={() => navigate("/auth/login", { replace: true })}
      >
        <Suspense fallback={<LoadingIntroUI />}>
          <AuthContainer>
            {({ logout }) => (
              <div>
                <Outlet />
                <footer
                  className={clsx(
                    "flex items-center fixed bottom-0 left-0 right-0",
                    "bg-gray-100 border-t-2 border-t-gray-200",
                    "text-xd-secondary-black-rgb text-[10px] leading-none"
                  )}
                >
                  <div className="pl-4">
                    <span>v.alpha-1</span>
                  </div>
                  <div className="pr-3 flex-1 flex justify-end items-center">
                    <button
                      onClick={logout}
                      className={clsx(
                        "button button-sm button-icon-ghost",
                        "p-1",
                        "space-x-1",
                        "text-[10px] leading-none"
                      )}
                    >
                      <span className="material-symbols-rounded text-base">
                        logout
                      </span>
                      <span>Log out</span>
                    </button>
                  </div>
                </footer>
              </div>
            )}
          </AuthContainer>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}
