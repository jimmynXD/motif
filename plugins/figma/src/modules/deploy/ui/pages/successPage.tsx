/**
 * TODO: Figure out fonts
 */

import { DiffStateUI, LoadingUI, TopNav } from "@/meta/ui/components"
import { useQuery } from "@tanstack/react-query"
import { getFigmaData } from "@/tokens/ui/api"
import { Link } from "react-router-dom"

export const SuccessPage = () => {
  const { data, isLoading, error } = useQuery(["tokens"], getFigmaData)

  const version = "0.1.0"

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

  return (
    <main className="flex flex-col h-full">
      <div className="flex-1">
        <TopNav />
        <section className="pt-12 px-8 flex flex-col items-center text-sm text-xd-primary-black-rgb">
          <div className="w-16">
            <img src={require("../assets/celebrate.svg")} />
          </div>
          <p className="pt-8 text-center">
            Congrats! You have successfully published Version <b>{version}</b>
          </p>
          <div className="pt-12">
            <Link to="/deploy" className="button button-link">
              <span className="material-symbols-rounded">arrow_back</span>
              <span className="flex-1">Go back</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
