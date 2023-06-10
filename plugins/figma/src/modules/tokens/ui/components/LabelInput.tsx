import clsx from "clsx"
import { FC, useEffect, useRef } from "react"

export interface LabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
}
export const LabelInput: FC<LabelInputProps> = ({ placeholder, ...other }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  return (
    <label
      className={clsx(
        "flex items-center w-full px-4",
        "text-sm dark:text-white"
      )}
    >
      <span className="font-medium pr-4">Name</span>
      <input
        {...other}
        ref={inputRef}
        type="text"
        className={clsx(
          "w-full rounded-xs p-2",
          "bg-white dark:bg-[#1C1C1E] border border-[#3C3C43]/40 dark:border-[#545458]/[.65]",
          "dark:text-white placeholder:text-[#C5C5C7] dark:placeholder:text-[#C5C5C7]",
          "disabled:text-black/20 dark:disabled:text-white/20"
        )}
        placeholder={placeholder}
      />
    </label>
  )
}
