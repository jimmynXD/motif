import { mainServices, trpc } from "@/meta/ui"
import { LoadingLogo, IntroLayout } from "@/meta/ui"
import { FC, useEffect, useState } from "react"
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

  const createAPIKeyMutation = trpc.api.auth.createAPIKey.useMutation({
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

  const [seconds, setSeconds] = useState<number>(60)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds])

  if (createAPIKeyMutation.isLoading) {
    return (
      <IntroLayout>
        <LoadingLogo />
        <div className="pt-12 text-sm">
          <span>{seconds} seconds remaining to authenticate...</span>
        </div>
      </IntroLayout>
    )
  }

  return null
}
