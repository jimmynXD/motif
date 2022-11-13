import clsx from "clsx"
import { FC } from "react"

export interface XDButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export const XDButton: FC<XDButtonInterface> = ({
  children,
  className,
  ...theRest
}) => {
  return (
    <button
      className={clsx(
        className,
        "button button-sm space-x-2 border-solid border border-[#F8B630] bg-[#F8B630]/10",
        "hover:bg-[#F8B630]/50"
      )}
      {...theRest}
    >
      {children}
    </button>
  )
}
