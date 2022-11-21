import { useRouter } from "next/router"
import { useEffect, type FC } from "react"
import { AllWorkspaces } from "../containers"
import { WorkspaceRootContainer } from "../containers/WorkspaceRootContainer"

const WorkspaceRoot: FC = () => {
  const router = useRouter()
  const { workspaceSlug } = router.query

  useEffect(() => {
    if (router.isReady && typeof workspaceSlug !== "string") {
      router.replace("/404")
    }
  }, [workspaceSlug, router.isReady])

  if (!router.isReady) {
    return <h1>Loading</h1>
  }

  if (typeof workspaceSlug !== "string") {
    return null
  }

  return (
    <>
      <AllWorkspaces />
      <WorkspaceRootContainer slug={workspaceSlug} />
    </>
  )
}

export default WorkspaceRoot
