import { trpc } from "@/meta/web"
import type { NextPage } from "next"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const HandleAuthTokenPage: NextPage = () => {
  const router = useRouter()
  const { authToken } = router.query
  const tokenMutation = trpc.auth.updateTokenWithUser.useMutation()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () =>
      signIn("google", {
        redirect: true,
        callbackUrl: `http://localhost:3000/auth/token/${authToken}`,
      }),
  })

  useEffect(() => {
    if (router.isReady && typeof authToken !== "string") {
      router.replace("/404")
    }
  }, [authToken, router.isReady])

  const handleToken = async (token: string) => {
    console.log("token", token)
    const res = await tokenMutation.mutateAsync({ token })
    router.replace("/auth/token/success")
  }

  useEffect(() => {
    if (typeof authToken !== "string" || status !== "authenticated") return

    handleToken(authToken)
  }, [session?.user, authToken])

  if (!router.isReady) {
    return <h1>Loading</h1>
  }

  if (typeof authToken !== "string") {
    // useEffect redirects to 404
    return null
  }

  return <h1>Loading</h1>
}
