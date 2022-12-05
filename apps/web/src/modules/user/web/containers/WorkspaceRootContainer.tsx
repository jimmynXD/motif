import { trpc } from "@/meta/web"
import clsx from "clsx"
import { FC } from "react"
import { ProjectsContainer } from "./ProjectsContainer"

export const WorkspaceRootContainer: FC<{ slug: string }> = ({ slug }) => {
  const { isLoading, error, data } = trpc.workspace.getWithSlug.useQuery({
    slug,
  })

  if (isLoading) {
    return <div className="p-4 md:pl-[19rem]">Loading...</div>
  }

  // TODO: redirect not found error to /404 page
  if (error) {
    return <div className="p-4 md:pl-[19rem]">Error</div>
  }

  return (
    <div
      className={clsx(
        "overflow-auto md:absolute md:top-0 md:bottom-0 md:right-0 left-80"
      )}
    >
      <ProjectsContainer workspaceName={data.name} workspaceId={data.id} />
    </div>
  )
}
