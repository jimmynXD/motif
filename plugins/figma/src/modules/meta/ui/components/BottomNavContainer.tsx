import clsx from "clsx"
import { FC, ReactNode } from "react"

interface BottomNavContainerProps {
  children: ReactNode
  fluid?: boolean
}
export const BottomNavContainer: FC<BottomNavContainerProps> = ({
  children,
  fluid,
}) => {
  return (
    <nav
      className={clsx(
        "fixed bottom-0 left-0 right-0",
        "bg-[#F9F9F9] border-t-[0.5px] border-t-black/30",
        "dark:bg-dark-bg dark:border-t-white/20",
        {
          "px-8 pb-1 pt-[6px]": !fluid,
        }
      )}
    >
      <div className={clsx("flex justify-between items-center")}>
        {children}
      </div>
    </nav>
  )
}
