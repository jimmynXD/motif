import clsx from "clsx"
import Link from "next/link"
import { FC, ReactNode } from "react"

export enum HightlightVariant {
  GREEN = "green",
  PURPLE = "purple",
}
interface HighlightButtonInterface {
  children: ReactNode
  left?: ReactNode
  right?: ReactNode
  variant?: HightlightVariant
  className?: string
  kind?: "button" | "a"
  href?: string
  target?: string
}
export const HighlightButton: FC<HighlightButtonInterface> = ({
  children,
  variant = HightlightVariant.GREEN,
  className,
  kind,
  href,
  left,
  right,
  target = "_blank",
  ...theRest
}) => {
  const elClass = clsx(
    className,
    "transition-all",
    "text-white button ring-2",
    "hover:ring-white",
    {
      "ring-teal-300 focus:hover:ring-teal-300 focus:bg-teal-500":
        variant === HightlightVariant.GREEN,
      "ring-purple-400 focus:hover:ring-purple-400 focus:bg-purple-500":
        variant === HightlightVariant.PURPLE,
    }
  )

  if (href && kind === "a") {
    return (
      <Link href={href} as="a" target={target} className={elClass}>
        {children}
      </Link>
    )
  }

  return (
    <button className={elClass} {...theRest}>
      {left}
      {children}
      {right}
    </button>
  )
}
