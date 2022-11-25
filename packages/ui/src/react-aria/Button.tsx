import clsx from "clsx"
import { FC, ReactNode, useRef } from "react"
import { AriaButtonProps, useButton } from "react-aria"

export interface ButtonProps extends AriaButtonProps<"button"> {
  children: ReactNode
  className?: string
}

export const Button: FC<ButtonProps> = ({
  children,
  className = "button-primary",
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(props, ref)
  return (
    <button ref={ref} className={clsx(className, "button")} {...buttonProps}>
      {children}
    </button>
  )
}
