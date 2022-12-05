import { PageLayout, TopNav } from "@/meta/web"
import clsx from "clsx"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { AllWorkspaces } from "../containers"
import { WorkspaceRootContainer } from "../containers/WorkspaceRootContainer"

/**
 * Workspace root page
 */
export const WorkspaceRoot: NextPage = () => {
  const router = useRouter()
  const { workspaceSlug } = router.query

  useEffect(() => {
    if (router.isReady && typeof workspaceSlug !== "string") {
      router.replace("/404")
    }
  }, [workspaceSlug, router.isReady])

  if (!router.isReady) {
    return <div className="p-4">Loading...</div>
  }

  if (typeof workspaceSlug !== "string") {
    // useEffect redirects to 404
    return null
  }

  return (
    <PageLayout pageTitle="Workspace" topNav={<TopNav pageLevel />}>
      <main
        className={clsx(
          "fixed left-0 right-0 bottom-0 top-16",
          "flex flex-col"
        )}
      >
        <AllWorkspaces />
        <WorkspaceRootContainer slug={workspaceSlug} />
      </main>
    </PageLayout>
  )
}
