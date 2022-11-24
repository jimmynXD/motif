import { trpc } from "@/meta/web"
import { type NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const RedirectRootWorkspace: NextPage = () => {
  const { isLoading, data, error } = trpc.user.getDefaultWorkspace.useQuery()
  const router = useRouter()

  useEffect(() => {
    if (data) {
      router.push(`/app/workspace/${data.slug}`)
    }
  }, [data])

  if (isLoading) {
    return <h1>Loading</h1>
  }

  if (error) {
    return <h1>error</h1>
  }

  if (!data) {
    return <h1>unknown error</h1>
  }

  return null
}
