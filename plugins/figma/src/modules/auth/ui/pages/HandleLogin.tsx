import { trpc } from "@/meta/ui"
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
  const createAPIKeyMutation = trpc.auth.createAPIKey.useMutation({
    retry: 10,
    retryDelay: 1000,
  })

  useEffect(() => {
    if (!token) {
      navigate(`/auth/login`, { replace: true })
    }
  }, [token])

  const createAPIKey = async () => {
    const res = await createAPIKeyMutation.mutateAsync({
      token,
    })
  }

  useEffect(() => {
    createAPIKey()
  }, [])

  if (!token) {
    return null
  }

  if (createAPIKeyMutation.isLoading) {
    return <div>Loading</div>
  }

  if (createAPIKeyMutation.error) {
    return <div>Error</div>
  }

  return (
    <h1>
      {token} | {createAPIKeyMutation.data?.key}
    </h1>
  )
}
