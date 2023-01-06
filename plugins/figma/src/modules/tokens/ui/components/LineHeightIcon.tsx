import clsx from "clsx"
import { FC } from "react"

export enum IconSize {
  DEFAULT = "default",
  LG = "lg",
}

// type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
export interface LineHeightIconProps {
  color?: string
  size?: IconSize
}
export const LineHeightIcon: FC<LineHeightIconProps> = ({
  color,
  size = IconSize.DEFAULT,
}) => {
  return (
    <span
      className={clsx(
        color,
        "relative px-[2px] py-[1px]",
        "before:absolute before:top-[1px] before:left-0 before:right-0 before:h-[1.5px] before:w-full before:rounded-full",
        "after:absolute after:bottom-[1px] after:left-0 after:right-0 after:h-[1.5px] after:w-full after:rounded-full",
        "leading-none",
        {
          "text-[10px]": size === IconSize.DEFAULT,
          "text-base": size === IconSize.LG,
          "text-ios-blue after:bg-ios-blue before:bg-ios-blue": !color,
        }
      )}
    >
      A
    </span>
  )
}
