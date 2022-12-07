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

export const InputButton: FC<InputButtonProps> = ({ onSubmit, label }) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [parseNewInput, setPasteNewInput] = useState(false)

  return (
    <section
      className={clsx(
        "md:mt-4 flex justify-center items-center flex-1",
        "border-2 border-dotted border-gray-500 rounded-lg",
        {
          "md:bg-gray-100": parseNewInput,
        }
      )}
    >
      {/* Open Button */}
      <Button
        onPress={() => setPasteNewInput(true)}
        className={clsx("flex-1 h-full p-2 md:px-4 md:py-3", {
          hidden: parseNewInput,
        })}
      >
        <div className={clsx("flex space-x-2")}>
          <span className="material-symbols-outlined font-lg">add</span>
          <span>{label}</span>
        </div>
      </Button>
      {/* Input */}
      <div
        className={clsx("md:p-2 flex flex-col justify-between w-full h-full", {
          hidden: !parseNewInput,
        })}
      >
        <div
          className={clsx("flex md:flex-col justify-between w-full h-full", {
            hidden: !parseNewInput,
          })}
        >
          <input
            className={clsx("w-full rounded md:border md:border-purple-500")}
            type="text"
            placeholder="Enter workspace name"
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
            className="p-1 text-sm button-icon-ghost md:hidden md:button-outline button-sm rounded ring-gray-700"
          >
            <span className="material-symbols-outlined">close</span>
          </Button>
          <div className="hidden md:flex justify-between space-x-2 pt-4">
            <Button
              isDisabled={inputValue.length === 0}
              onPress={(e) => {
                if (e.type === "press") {
                  onSubmit(inputValue)
                  setPasteNewInput(false)
                  setInputValue("")
                }
              }}
              className={clsx(
                "button-primary button-sm rounded",
                "disabled:bg-gray-300"
              )}
            >
              Create
            </Button>
            <Button
              onPress={(e) => {
                if (e.type === "press") {
                  setPasteNewInput(false)
                  setInputValue("")
                }
              }}
              className="button-outline button-sm rounded ring-gray-700"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export const LargeInputButton: FC<InputButtonProps> = ({ onSubmit, label }) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [parseNewInput, setPasteNewInput] = useState(false)

  return (
    <section
      className={clsx(
        "flex justify-center items-center flex-1",
        "group min-h-[140px] border-2 border-dotted border-gray-500 rounded-lg",
        {
          "bg-gray-100": parseNewInput,
        }
      )}
    >
      {/* Open button */}
      <Button
        onPress={() => setPasteNewInput(true)}
        className={clsx("flex-1 h-full p-4", {
          hidden: parseNewInput,
        })}
      >
        <div className={clsx("flex flex-col", "group-hover:text-purple-700")}>
          <span className="material-symbols-outlined font-lg group-hover:text-purple-700">
            add
          </span>
          <span>{label}</span>
        </div>
      </Button>

      {/* Input */}
      <div
        className={clsx("p-4 flex flex-col justify-between w-full h-full", {
          hidden: !parseNewInput,
        })}
      >
        <input
          className={clsx("w-full rounded border border-purple-500")}
          type="text"
          placeholder="Enter project name"
          onKeyDown={async (e) => {
            // do not submit if input is empty
            if (e.currentTarget.value.length === 0) return
            if (e.key === "Enter") {
              onSubmit(e.currentTarget.value)
              setPasteNewInput(false)
              setInputValue("")
            }
          }}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          value={inputValue}
        />

        <div className="flex justify-between space-x-2">
          <Button
            isDisabled={inputValue.length === 0}
            onPress={(e) => {
              if (e.type === "press") {
                setPasteNewInput(false)
                setInputValue("")
              }
            }}
            className={clsx(
              "button-primary button-sm rounded",
              "disabled:bg-gray-300"
            )}
          >
            Create
          </Button>
          <Button
            onPress={(e) => {
              if (e.type === "press") {
                setPasteNewInput(false)
                setInputValue("")
              }
            }}
            className="button-outline button-sm rounded ring-gray-700"
          >
            Cancel
          </Button>
        </div>
      </div>
    </section>
  )
}
