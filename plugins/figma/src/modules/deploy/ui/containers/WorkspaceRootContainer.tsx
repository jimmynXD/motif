import { trpc } from "@/meta/ui"
import { FC } from "react"
import { ProjectsContainer } from "./ProjectsContainer"

interface WorkspaceRootContainerProps {
  slug: string
}

export const WorkspaceRootContainer: FC<WorkspaceRootContainerProps> = ({
  slug,
}) => {
  const [data] = trpc.api.workspace.getWithSlug.useSuspenseQuery({
    slug,
  })
  return <ProjectsContainer workspaceId={data.id} />
}
