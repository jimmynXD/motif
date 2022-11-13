/**
 * TODO: Figure out fonts
 */

import * as React from "react"
import { TopNav, XDButton } from "@/meta/ui/components"
import { useQuery } from "@tanstack/react-query"
import { getFigmaData } from "@/tokens/api"

export const DeployPage = () => {
  const { data, isLoading, error, refetch } = useQuery(["tokens"], getFigmaData)

  const colorCount = React.useMemo(() => {
    return data?.colorResults.length
  }, [data])
  const textCount = React.useMemo(() => {
    return data?.textResults.length
  }, [data])

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (error instanceof Error) {
    return <span>{error?.message}</span>
  }

  if (!data) return <span>no data</span>

  return (
    <main className="flex flex-col h-full">
      <div className="flex-1">
        <TopNav />
        <section className="py-10 px-8">
          <div className="grid grid-cols-[1fr_1fr] gap-8">
            <aside className="flex flex-col justify-center items-center border border-[#458930] rounded-lg bg-[#458930]/[.10] py-4 text-xd-primary-black-rgb text-sm">
              <div>Current Version</div>
              <div className="font-semibold">0.0.0</div>
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
        <section className="pt-8 px-8 space-y-8">
          <XDButton className="w-full" onClick={() => refetch()}>
            <span className="flex-1">Pull In Updates</span>
            <span className="material-symbols-rounded">refresh</span>
          </XDButton>
          <button disabled className="w-full button button-primary button-sm">
            <span className="flex-1">Push Updates To Deployments</span>
            <span className="material-symbols-rounded">send</span>
          </button>
        </section>
      </div>
      <footer className="flex items-end">
        <div className="px-8 py-3 bg-[#121212]/[0.1] border-t border-t-[#CBD2E1]">
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <span className="material-symbols-rounded">warning</span>
            <span className="text-xs leading-5">
              If you expected more, press the <b>Pull</b> button to search for
              those missing items.
            </span>
          </div>
        </div>
      </footer>
    </main>
  )
}
