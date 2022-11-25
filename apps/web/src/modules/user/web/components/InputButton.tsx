import clsx from "clsx"
import { FC, useState } from "react"
import { Button } from "ui"

interface InputButtonProps {
  className?: string
  inputWrapperClassName?: string
  onSubmit: (value: string) => void | Promise<void>
  label: string
  labelRight?: boolean
}
export const InputButton: FC<InputButtonProps> = ({
  className,
  inputWrapperClassName,
  onSubmit,
  label,
  labelRight,
}) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [parseNewInput, setPasteNewInput] = useState(false)

  return (
    <div className={clsx(className, "flex")}>
      <Button
        onPress={() => setPasteNewInput(true)}
        className={clsx("flex-1 button-red button-sm space-x-2", {
          hidden: parseNewInput,
        })}
      >
        <span className="material-symbols-outlined font-lg">add</span>
        <span>{label}</span>
      </Button>
      <div
        className={clsx(inputWrapperClassName, {
          hidden: !parseNewInput,
        })}
      >
        <label className="relative group">
          <span
            className={clsx(
              "absolute",
              "px-2 py-1 rounded-full",
              "text-xs font-medium pb-1 text-gray-700 bg-gray-200",
              "group-focus-within:text-white group-focus-within:bg-purple-700",
              {
                "-translate-x-full -translate-y-1/2 top-1/2 left-0": labelRight,
                "left-0 -top-1 -translate-y-full": !labelRight,
              }
            )}
          >
            {label}
          </span>
          <div className={clsx("w-full", "flex items-center relative")}>
            <Button
              onPress={(e) => {
                if (e.type === "press") {
                  onSubmit(inputValue)
                  setPasteNewInput(false)
                  setInputValue("")
                }
              }}
              className="absolute left-0 button button-icon-ghost button-sm rounded-full text-purple-500"
            >
              <span className="material-symbols-outlined text-xl">send</span>
            </Button>
            <input
              className={clsx(
                "px-7 flex-1 border border-gray-300 ml-1 rounded-lg"
              )}
              type="text"
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  onSubmit(e.currentTarget.value)
                  setPasteNewInput(false)
                  setInputValue("")
                }
              }}
              onChange={(e) => setInputValue(e.currentTarget.value)}
              value={inputValue}
            />
            <Button
              onPress={(e) => {
                if (e.type === "press") {
                  setPasteNewInput(false)
                  setInputValue("")
                }
              }}
              className="absolute right-1 button-icon-ghost button-sm p-0"
            >
              <span className="text-lg material-symbols-outlined text-normal">
                close
              </span>
            </Button>
          </div>
        </label>
      </div>
    </div>
  )
}
