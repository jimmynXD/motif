import { useSession, signIn, signOut } from "next-auth/react"

import { trpc } from "@/meta/web"
import { useRouter } from "next/router"
import { useEffect } from "react"

/**
 * TODO: Replace this page with a proper login page
 *
 */
export default function Web() {
  const { isLoading, error, data } = trpc.test.hello.useQuery({
    text: "Hello",
  })

  const { data: session } = useSession()

  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      router.replace("/404")
    }
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return (
    <div>
      <h1>{data.greeting}</h1>
      <button
        onClick={() =>
          session
            ? signOut()
            : signIn("google", {
                redirect: true,
                // TODO: replace /w url from env
                callbackUrl: "http://localhost:3000/app/workspace",
              })
        }
      >
        {session ? "signOut" : "sign in"}
      </button>
    </div>
  )
}
