import clsx from "clsx"
import { FC, ReactNode } from "react"

export interface BadgeProps {
  label: string | number
  icon?: ReactNode
}

export const Badge: FC<BadgeProps> = ({ label, icon }) => {
  return (
    <div
      className={clsx(
        "bg-[#E1E1E2] px-2 py-[2px] rounded-full",
        "text-[#007AFF] text-xs",
        "mt-2 mr-2 last:mr-0",
        {
          "space-x-1": icon,
        }
      )}
    >
      {icon}
      <span>{label}</span>
    </div>
  )
}
