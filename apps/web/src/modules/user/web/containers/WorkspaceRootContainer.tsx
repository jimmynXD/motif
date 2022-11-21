import { trpc } from "@/meta/web"
import { FC } from "react"

export const WorkspaceRootContainer: FC<{ slug: string }> = ({ slug }) => {
  const { isLoading, error, data } = trpc.workspace.getWithSlug.useQuery({
    slug,
  })

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  // TODO: redirect not found error to /404 page
  if (error) {
    return <h1>Error</h1>
  }

  return (
    <div>
      {data.name}, {data.id}
    </div>
  )
}
