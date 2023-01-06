import clsx from "clsx"
import { FC, ReactNode } from "react"

export interface EmptySectionInterface {
  children: ReactNode
  divider?: boolean
  imgSrc: string
}

export const EmptySection: FC<EmptySectionInterface> = ({
  children,
  divider,
  imgSrc,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center pt-8",
        "text-sm font-medium dark:text-white",
        {
          "pb-8 border-b border-b-[#3C3C43]/40 dark:border-b-[#545458]/[.65]":
            divider,
        }
      )}
    >
      <span>
        <img src={imgSrc} />
      </span>
      {children}
    </div>
  )
}
