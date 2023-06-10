import clsx from "clsx"
import { FC, ReactNode } from "react"
export interface PageLayoutProps {
  bgWhite?: boolean
  bottomNav?: ReactNode
  children: ReactNode
  empty?: boolean
}
export const PageLayout: FC<PageLayoutProps> = ({
  bgWhite,
  bottomNav,
  children,
  empty,
}) => {
  if (empty)
    return <main className="flex flex-col min-h-screen">{children}</main>

  return (
    <main className="flex flex-col min-h-screen">
      <div
        className={clsx("flex-1", {
          "bg-[#F2F2F7] dark:bg-black": !bgWhite,
          "bg-white dark:bg-dark-bg": bgWhite,
        })}
      >
        {children}
      </div>
      {bottomNav}
    </main>
  )
}
