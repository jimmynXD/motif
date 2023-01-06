import clsx from "clsx"
import { FC, ReactNode } from "react"

export interface SectionProps {
  children: ReactNode
  className?: string
  label: string
}
export const Section: FC<SectionProps> = ({
  children,
  className = "pt-8",
  label,
}) => {
  return (
    <div className={className}>
      <div
        className={clsx(
          "bg-[#f5f1e4] mx-2 rounded-full",
          "leading-5 text-xs text-center text-xd-black-primary-rgb py-1 font-semibold"
        )}
      >
        {label}
      </div>
      {children}
    </div>
  )
}
