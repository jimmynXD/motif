import clsx from "clsx"
import { FC, ReactNode } from "react"

export interface IconInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode
  placeholder?: string
}
export const IconInput: FC<IconInputProps> = ({
  icon,
  placeholder,
  ...props
}) => {
  return (
    <label
      className={clsx(
        "relative w-full",
        "rounded-sm bg-white text-left border border-figma-border",
        "text-sm cursor-default"
      )}
    >
      <span className={clsx("absolute inset-y-0 left-0 w-8 flex items-center")}>
        {icon}
      </span>
      <input
        {...props}
        type="text"
        className={clsx(
          "w-full pl-10 pr-3 py-0 h-8",
          "border-none focus:ring-0",
          "font-display font-semibold"
        )}
        placeholder={placeholder}
      />
    </label>
  )
}
