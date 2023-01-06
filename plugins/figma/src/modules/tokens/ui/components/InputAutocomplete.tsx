import { Combobox, Transition } from "@headlessui/react"
import clsx from "clsx"
import { FC, Fragment, useState } from "react"

export interface LabelAutocompleteProps {
  items: string[]
  selected?: string
  setSelected?: (value: string) => void
}

export const InputAutocomplete: FC<LabelAutocompleteProps> = ({
  items,
  selected,
  setSelected,
}) => {
  const [query, setQuery] = useState("")

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase())
        })
  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative">
        <div
          className={clsx(
            "relative w-full",
            "focus:outline-none",
            "rounded-sm overflow-hidden text-left border border-figma-border",
            "text-sm cursor-default",
            "dark:border-dark-border"
          )}
        >
          <Combobox.Input
            className={clsx(
              "w-full pl-3 pr-10 py-0 h-8",
              "border-none focus:ring-0",
              "font-display font-semibold",
              "dark:bg-dark-input-bg dark:text-white"
            )}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button
            className={clsx(
              "absolute inset-y-0 right-0 w-8 bg-[#F5F5F5] flex-items-center",
              "dark:bg-[#383838] dark:text-white"
            )}
          >
            {({ open }) => (
              <span className="material-symbols-rounded leading-none text-lg">
                {open ? "expand_less" : "expand_more"}
              </span>
            )}
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options
            className={clsx(
              "z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-lg",
              "bg-white py-1 drop-shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none",
              "text-sm border border-figma-border dark:border-dark-border",
              "dark:bg-dark-input-bg"
            )}
          >
            {filteredItems.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-white">
                Nothing found.
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <Combobox.Option
                  key={index}
                  className={({ selected, active }) =>
                    clsx(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      {
                        "bg-xd-primary-purple-100 text-xd-primary-purple-900":
                          active,
                        "dark:text-xd-purple-500": selected,
                        "text-gray-900 dark:text-gray-100": !active,
                      }
                    )
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx("block truncate", {
                          "font-medium": selected,
                          "font-normal": !selected,
                        })}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xd-primary-purple-700 dark:text-xd-purple-500">
                          <span className="material-symbols-rounded text-lg">
                            check
                          </span>
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}
