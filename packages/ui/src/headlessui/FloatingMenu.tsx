import clsx from "clsx"
import { FC, Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"

export interface FloatingMenuProps {
  label: string
}
export const FloatingMenu: FC<FloatingMenuProps> = ({ label }) => {
  return (
    <Menu as="aside" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={clsx(
            "button button-sm button-icon-ghost",
            "flex-col space-y-1",
            "text-[10px] leading-none"
          )}
        >
          <span className="material-symbols-rounded text-base">plus</span>
          <span>{label}</span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            "absolute right-0 top-0 -translate-y-full origin-top-right",
            "bg-[#F2ECF6] rounded-md shadow min-w-[140px]",
            "text-sm"
          )}
        >
          <div className="flex flex-col py-2">
            <Menu.Item>
              <div>stuff</div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
