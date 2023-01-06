import { FC, ReactNode } from "react"

interface ErrorUIInterface {
  children?: ReactNode
  icon?: string
  subMsg?: ReactNode
}
export const DiffStateUI: FC<ErrorUIInterface> = ({
  children,
  icon,
  subMsg,
}) => {
  return (
    <main className="flex flex-col h-full darK:text-white">
      <div className="flex flex-col justify-center items-center px-4 pt-16 py-4 space-y-6">
        <span className="material-symbols-rounded text-7xl dark:text-white">
          {icon ?? "priority_high"}
        </span>
        <p className="font-medium">
          {children ?? "Oh no, something went awry."}
        </p>
        {subMsg && <p>{subMsg}</p>}
      </div>
    </main>
  )
}
