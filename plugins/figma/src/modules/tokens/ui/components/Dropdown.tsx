import { Listbox, Transition } from "@headlessui/react"
import clsx from "clsx"
import { FC, Fragment } from "react"

/**
 * TODO: Work in progress
 * not ready for primetime
 */
export interface DropdownProps {
  selected: string
  setSelected: (value: string) => void
  items: string[]
}
export const Dropdown: FC<DropdownProps> = ({
  items,
  selected,
  setSelected,
}) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button
          className={clsx(
            "flex items-center",
            "pl-2 w-full cursor-default rounded-sm bg-white",
            "border border-[#E6E6E6] text-left font-semibold"
          )}
        >
          {({ open }) => (
            <>
              <span className="w-full block font-display truncate">
                {selected}
              </span>
              <button className={clsx("w-8 h-8 bg-[#F5F5F5]")}>
                <span className="material-symbols-rounded leading-none text-lg">
                  {open ? "expand_less" : "expand_more"}
                </span>
              </button>
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className={clsx(
              "z-10 absolute mt-1 max-h-60 w-full overflow-auto",
              "bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
              "text-sm"
            )}
          >
            {items.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  clsx("relative cursor-default select-none py-2 pl-10 pr-4", {
                    "bg-xd-primary-purple-100 text-xd-primary-purple-900":
                      active,
                    "text-gray-900": !active,
                  })
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xd-primary-purple-700">
                        <span className="material-symbols-rounded text-lg">
                          check
                        </span>
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
