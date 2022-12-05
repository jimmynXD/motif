import { mainServices, trpc } from "@/meta/ui"
import { FC, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

const useToken = () => {
  const { token } = useParams()

  if (!token) {
    throw new Error("No token")
  }

  return token
}

export const HandleLogin: FC = () => {
  const token = useToken()
  const navigate = useNavigate()

  const retryDelay = 1000 // 1s
  const retry = 60 // try for 1 min

  const createAPIKeyMutation = trpc.auth.createAPIKey.useMutation({
    retry,
    retryDelay,
    onError: (e) => {
      console.error(e, "HELP")
      navigate("/auth/login/failure")
    },
    onSuccess: async (res) => {
      await mainServices.meta.storage.set("auth.api-key", res)
      navigate(`/`, { replace: true })
    },
  })

  useEffect(() => {
    createAPIKeyMutation.mutate({ token })
  }, [])

  if (createAPIKeyMutation.isLoading) {
    // TODO(@jimmynxd): tell users that they have 1min to authenticate
    return <div>Loading</div>
  }

  return null
}
