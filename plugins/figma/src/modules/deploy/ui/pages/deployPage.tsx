/**
 * TODO: Figure out fonts
 */

import * as React from "react"
import { DiffStateUI, LoadingUI, TopNav } from "@/meta/ui/components"
import { useQuery } from "@tanstack/react-query"
import { getFigmaData } from "@/tokens/ui/api"

import { trpc } from "@/meta/ui"
import { useNavigate, useLocation, Outlet } from "react-router-dom"

export const DeployPage = () => {
  const { data, isLoading, error } = useQuery(["tokens"], getFigmaData)

  const location = useLocation()

  const navigate = useNavigate()

  const colorCount = React.useMemo(() => {
    return data?.colorResults.length
  }, [data])
  const textCount = React.useMemo(() => {
    return data?.textResults.length
  }, [data])

  const deployMutation = trpc.token.publishMany.useMutation()

  const handleSubmission = async () => {
    if (!data || isLoading) {
      return
    }

    // TODO: Check if there are any changes since last deployment

    await deployMutation.mutateAsync({
      colorTokens: data.colorResults,
      typographyTokens: data.textResults,
    })

    return navigate("/deploy/success", { relative: "route" })
  }

  if (isLoading) {
    return <LoadingUI />
  }

  if (error instanceof Error) {
    return <DiffStateUI subMsg="Try Reloading.">{error?.message}</DiffStateUI>
  }

  if (!data)
    return (
      <DiffStateUI icon="breaking_news_alt_1" subMsg="Try Reloading.">
        No data found.
      </DiffStateUI>
    )

  if (location.pathname === "/deploy/success") return <Outlet />

  return (
    <main className="flex flex-col h-full">
      <div className="flex-1">
        <TopNav />
        <section className="py-10 px-8">
          <div className="grid grid-cols-[1fr_1fr] gap-8">
            <aside className="flex flex-col justify-center items-center border border-[#458930] rounded-lg bg-[#458930]/[.10] py-4 text-xd-primary-black-rgb text-sm">
              <div>Current Version</div>
              <div className="font-semibold">alpha</div>
            </aside>
            <div className="font-mono text-sm">
              <div className="grid grid-cols-[1fr_auto] gap-1">
                <span className="font-mono text-xd-success-700">
                  color tokens
                </span>
                <span className="text-xd-secondary-black-rgb">
                  {colorCount}
                </span>
                <span className="text-xd-success-700">text style tokens</span>
                <span className="text-xd-secondary-black-rgb">{textCount}</span>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-8 px-8">
          <button
            disabled
            // disabled={deployMutation.isLoading}
            className="w-full button button-primary button-sm"
            onClick={handleSubmission}
          >
            <span className="flex-1">Deploy your tokens</span>
            <span className="material-symbols-rounded">send</span>
          </button>
        </section>
      </div>
      <footer className="flex items-end">
        <div className="px-8 py-3 bg-[#121212]/[0.1] border-t border-t-[#CBD2E1]">
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <span className="material-symbols-rounded">warning</span>
            <span className="text-xs leading-5">
              We are currently in alpha. Visit{" "}
              <b className="text-xd-primary-purple-700">motifxd.com</b> for the
              latest updates XD
            </span>
          </div>
        </div>
      </footer>
    </main>
  )
}
