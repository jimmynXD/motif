import { Button } from "ui"

import { trpc } from "@/meta/web"

export default function Web() {
  const { isLoading, error, data } = trpc.hello.useQuery({
    text: "Hello",
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      <h1>{data.greeting}</h1>
      <Button />
    </div>
  )
}
