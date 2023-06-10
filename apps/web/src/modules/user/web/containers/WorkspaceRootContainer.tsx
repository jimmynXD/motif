import { trpc } from "@/meta/web"
import clsx from "clsx"
import { FC } from "react"
import { ProjectsContainer } from "./ProjectsContainer"

interface WorkspaceRootContainerProps {
  slug: string
}
export const WorkspaceRootContainer: FC<WorkspaceRootContainerProps> = ({
  slug,
}) => {
  const { isLoading, error, data, refetch } =
    trpc.workspace.getWithSlug.useQuery({
      slug,
    })

  if (isLoading) {
    return <div className={clsx("p-4")}>Loading...</div>
  }

  // TODO: redirect not found error to /404 page
  if (error) {
    return <div className={clsx("p-4")}>Error</div>
  }

  return (
    <div className={clsx()}>
      <div className="pt-12 ">
        <h1 className="font-medium text-xl md:text-3xl">{data.name}</h1>
        <ProjectsContainer workspaceId={data.id} />
      </div>
    </div>
  )
}
