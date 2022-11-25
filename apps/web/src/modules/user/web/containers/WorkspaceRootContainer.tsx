import { trpc } from "@/meta/web"
import clsx from "clsx"
import { FC } from "react"
import { ProjectsContainer } from "./ProjectsContainer"

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
    <div className={clsx("pl-72 pt-20")}>
      <ProjectsContainer workspaceName={data.name} workspaceId={data.id} />
    </div>
  )
}
