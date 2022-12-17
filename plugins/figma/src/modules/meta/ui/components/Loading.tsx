import { FC } from "react"
import { IntroLayout } from "./IntroLayout"
import { LoadingLogo } from "./LoadingLogo"

export const LoadingUI: FC = () => {
  return (
    <main className="flex flex-col h-full">
      <div className="h-12 py-2 px-4 grid grid-cols-2 gap-4">
        <div className="animate-pulse rounded bg-xd-neutral-300 h-full w-full" />
        <div className="animate-pulse rounded bg-xd-neutral-300 h-full w-full" />
      </div>
      <div className="flex-1 px-4 pb-4">
        <div className="animate-pulse rounded bg-xd-neutral-300 h-full w-full" />
      </div>
    </main>
  )
}

export const LoadingIntroUI: FC = () => {
  return (
    <IntroLayout>
      <LoadingLogo />
    </IntroLayout>
  )
}
