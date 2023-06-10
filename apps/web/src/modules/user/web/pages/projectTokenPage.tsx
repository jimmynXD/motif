import { Footer, PageLayout, TopNav, trpc } from "@/meta/web"
import clsx from "clsx"
import { useRouter } from "next/router"
import { FC, useEffect } from "react"
import { ProjectTokenContainer } from "../containers"

export const ProjectTokenPage: FC = () => {
  const router = useRouter()
  const { workspaceSlug } = router.query
  const { isLoading, data, error } = trpc.user.getDefaultWorkspace.useQuery()
  useEffect(() => {
    if (router.isReady && typeof workspaceSlug !== "string") {
      router.replace("/404")
    }
  }, [workspaceSlug, router.isReady])

  if (!router.isReady || isLoading) {
    return <div className="p-4">Loading...</div>
  }

  if (typeof workspaceSlug !== "string" || error) {
    return null
  }

  return (
    <PageLayout
      cls={clsx(
        "bg-transparent dark:bg-[#111111]",
        "shadow-[inset_0_-1px_0_0_rgb(0_0_0_/_0.1)]",
        "dark:shadow-[inset_0_-1px_0_0_rgb(255_255_255_/_0.1)]"
      )}
      pageTitle="Tokens"
      topNav={
        <TopNav
          pageLevel
          className="sticky top-0 shadow-[inset_0_-1px_0_0_rgb(0_0_0_/_0.1)] dark:shadow-[inset_0_-1px_0_0_rgb(255_255_255_/_0.1)]"
        />
      }
      outsideFooter={<Footer pageLevel />}
    >
      <ProjectTokenContainer workspaceId={data?.id ?? "none"} />
    </PageLayout>
  )
}
