import { TopNav, trpc } from "@/meta/ui"
import { FC } from "react"
import { ProjectsContainer } from "../containers"

export const DeployPage: FC = () => {
  const [data] = trpc.api.user.getDefaultWorkspace.useSuspenseQuery()
  if (!data) return null
  return (
    <TopNav workspaceId={data.id}>
      <ProjectsContainer workspaceId={data.id} />
    </TopNav>
  )
}
