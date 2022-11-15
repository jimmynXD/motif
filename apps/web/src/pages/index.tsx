import { useSession, signIn, signOut } from "next-auth/react"

import { trpc } from "@/meta/web"

export default function Web() {
  const { isLoading, error, data } = trpc.test.hello.useQuery({
    text: "Hello",
  })

  const { data: session } = useSession()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      <h1>{data.greeting}</h1>
      <button onClick={() => (session ? signOut() : signIn())}>
        {session ? "signOut" : "singin"}
      </button>
    </div>
  )
}
