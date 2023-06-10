import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import { Button, Popover } from "ui"

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
        "border-2 border-dotted border-gray-500 rounded",
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
        "transition-all shadow-md",
        "group min-h-[140px] dark:bg-transparent rounded",
        {
          "bg-xd-primary-purple-100": parseNewInput,
          "dark:ring-2 dark:ring-white": parseNewInput,
          "dark:ring-1 dark:ring-gray-500 dark:hover:ring-white":
            !parseNewInput,
          "bg-xd-primary-purple-800 text-white hover:shadow-xl hover:bg-white hover:text-black hover:ring hover:ring-xd-primary-purple-800":
            !parseNewInput,
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
        <div className={clsx("flex flex-col")}>
          <span className="material-symbols-outlined font-lg">add</span>
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
          ref={(input) => input && input.focus()}
          className={clsx("w-full rounded border border-purple-500")}
          type="text"
          placeholder="Enter project name"
          onKeyDown={async (e) => {
            // do not submit if input is empty
            if (e.currentTarget.value.length === 0) return
            if (e.key === "Enter") {
              onSubmit(inputValue)
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
    </section>
  )
}

interface ProjectButtonProps {
  onEditClick: (value: string) => void | Promise<void>
  onDeleteClick: () => void | Promise<void>
  projectName: string
  updatedAt?: string
}

export const ProjectButton: FC<ProjectButtonProps> = ({
  onEditClick,
  onDeleteClick,
  projectName,
  updatedAt,
}) => {
  const router = useRouter()
  const { workspaceSlug } = router.query
  const [inputValue, setInputValue] = useState<string>(projectName)
  const [parseNewInput, setPasteNewInput] = useState(false)
  const menuItems = [
    {
      label: "Edit",
      icon: "edit",
      onClick: () => {
        setPasteNewInput(true)
      },
    },
    {
      label: "Delete",
      icon: "delete",
      onClick: onDeleteClick,
    },
  ]
  return (
    <section
      className={clsx(
        "flex flex-col",
        "relative transition-all p-4",
        "group min-h-[140px] bg-white dark:bg-transparent rounded transition-all shadow-md",

        {
          "bg-xd-primary-purple-100 dark:bg-gray-800 dark:ring-2 dark:ring-white":
            parseNewInput,
          "dark:hover:ring-2 dark:hover:ring-white": !parseNewInput,
          "hover:shadow-xl dark:ring-1 dark:ring-gray-500": !parseNewInput,
        }
      )}
    >
      {/* Open button */}
      <div
        className={clsx("flex flex-col items-start justify-start h-full", {
          hidden: parseNewInput,
        })}
      >
        <Link
          href={{
            pathname: "[workspaceSlug]/[projectName]",
            query: { workspaceSlug, projectName },
          }}
          className={clsx(
            "w-full pr-4 transition-colors",
            "font-semibold hover:text-xd-primary-purple-700 dark:hover:text-purple-400"
          )}
        >
          {projectName}
        </Link>
        <div className="absolute top-2 right-2">
          <Popover menuItems={menuItems} />
        </div>
        <div className={clsx("pt-4 flex flex-col items-start", "text-sm")}>
          <div className={clsx("text-xs text-gray-700 dark:text-gray-300")}>
            Last update:
          </div>
          <p className="pt-1">{updatedAt}</p>
        </div>
      </div>

      {/* Input */}
      <div
        className={clsx("flex flex-col justify-between w-full h-full", {
          hidden: !parseNewInput,
        })}
      >
        <input
          ref={(input) => input && input.focus()}
          className={clsx("w-full rounded border border-purple-500")}
          type="text"
          placeholder="Enter project name"
          onKeyDown={async (e) => {
            // do not submit if input is empty
            if (e.currentTarget.value.length === 0) return
            if (e.key === "Enter") {
              onEditClick(inputValue)
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
                onEditClick(inputValue)
                setPasteNewInput(false)
                setInputValue("")
              }
            }}
            className={clsx(
              "button-primary button-sm rounded",
              "disabled:bg-gray-300"
            )}
          >
            Update
          </Button>
          <Button
            onPress={(e) => {
              if (e.type === "press") {
                setPasteNewInput(false)
                setInputValue("")
              }
            }}
            className="button-outline button-sm rounded ring-gray-700 dark:ring-gray-300 dark:bg-transparent dark:text-gray-300 dark:hover:text-black"
          >
            Cancel
          </Button>
        </div>
      </div>
    </section>
  )
}

interface InlineInputProps {
  onEditClick: (value: string) => void | Promise<void>
  onDeleteClick: () => void | Promise<void>
  workspaceName: string
  hidePopover?: boolean
}

export const InlineInput: FC<InlineInputProps> = ({
  onEditClick,
  onDeleteClick,
  workspaceName,
  hidePopover = false,
}) => {
  const [inputValue, setInputValue] = useState<string>(workspaceName)
  const [parseNewInput, setPasteNewInput] = useState(false)
  const menuItems = [
    {
      label: "Edit",
      icon: "edit",
      onClick: () => {
        setPasteNewInput(true)
      },
    },
    {
      label: "Delete",
      icon: "delete",
      onClick: onDeleteClick,
    },
  ]
  return (
    <>
      {/* Open button */}
      <div
        className={clsx(
          "flex flex-row justify-center md:justify-start items-baseline space-x-4 space-y-0",
          {
            hidden: parseNewInput,
          }
        )}
      >
        <h2 className={clsx("font-semibold")}>{workspaceName}</h2>
        {!hidePopover && <Popover menuItems={menuItems} />}
      </div>

      {/* Input */}
      <div
        className={clsx("flex space-x-4", {
          hidden: !parseNewInput,
        })}
      >
        <input
          ref={(input) => input && input.focus()}
          className={clsx("rounded border border-purple-500")}
          type="text"
          placeholder="Enter project name"
          onKeyDown={async (e) => {
            // do not submit if input is empty
            if (e.currentTarget.value.length === 0) return
            if (e.key === "Enter") {
              onEditClick(inputValue)
              setPasteNewInput(false)
              setInputValue("")
            }
          }}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          value={inputValue}
        />

        <div className="inline-flex space-x-2">
          <Button
            isDisabled={inputValue.length === 0}
            onPress={(e) => {
              if (e.type === "press") {
                onEditClick(inputValue)
                setPasteNewInput(false)
                setInputValue("")
              }
            }}
            className={clsx(
              "button-primary button-sm rounded",
              "disabled:bg-gray-300"
            )}
          >
            Update
          </Button>
          <Button
            onPress={(e) => {
              if (e.type === "press") {
                setPasteNewInput(false)
                setInputValue("")
              }
            }}
            className="button-ghost button-sm rounded"
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  )
}
