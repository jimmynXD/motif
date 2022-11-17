import { FC } from "react"

export const LoadingUI: FC = () => {
  return (
    <main className="flex flex-col h-full">
      <div className="h-12 py-3 px-4 grid grid-cols-2 gap-4">
        <div className="animate-pulse rounded bg-xd-neutral-300 h-full w-full" />
        <div className="animate-pulse rounded bg-xd-neutral-300 h-full w-full" />
      </div>
      <div className="flex-1 p-4">
        <div className="animate-pulse rounded bg-xd-neutral-300 h-full w-full" />
      </div>
    </main>
  )
}
