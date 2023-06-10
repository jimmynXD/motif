import { Footer, PageLayout, TopNav } from "@/meta/web"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { WorkspaceRootContainer } from "../containers/WorkspaceRootContainer"
import { Tabs } from "../components"
import clsx from "clsx"

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
    return null
  }

  const contentArray = [
    {
      title: "Projects",
      content: <WorkspaceRootContainer slug={workspaceSlug} />,
    },
    {
      title: "Settings",
      content: <div className="py-12">Settings</div>,
    },
  ]

  return (
    <PageLayout
      cls={clsx(
        "bg-gray-100 dark:bg-[#111111]",
        "shadow-[inset_0_-1px_0_0_rgb(0_0_0_/_0.1)]",
        "dark:shadow-[inset_0_-1px_0_0_rgb(255_255_255_/_0.1)]"
      )}
      pageTitle="Workspace"
      topNav={<TopNav pageLevel />}
      outsideFooter={<Footer pageLevel />}
    >
      <Tabs contentArray={contentArray} />
    </PageLayout>
  )
}
