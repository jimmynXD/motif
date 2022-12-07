import { Menu, Transition } from "@headlessui/react"
import { FC, Fragment } from "react"
import clsx from "clsx"

type PopoverDataTypes = {
  label: string
  icon?: string
  onClick: () => void
}
export interface PopoverProps {
  menuItems: PopoverDataTypes[]
}
export const Popover: FC<PopoverProps> = ({ menuItems }) => {
  return (
    <Menu as="aside" className={clsx("z-10 relative")}>
      <Menu.Button>
        <span className={clsx("text-gray-500 material-symbols-outlined")}>
          more_horiz
        </span>
      </Menu.Button>
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
          as="div"
          className={clsx(
            "absolute right-0 origin-top-right flex flex-col",
            "divide-y divide-gray-400 rounded bg-white border border-gray-400 min-w-[80px]",
            "shadow-md text-xs text-black"
          )}
        >
          {menuItems.map((item, index) => (
            <Menu.Item
              as="button"
              key={index}
              onClick={item.onClick}
              className={clsx(
                "px-2 py-1 flex justify-start items-center",
                "space-x-1 text-gray-500 transition-all",
                "hover:text-white hover:bg-gray-500"
              )}
            >
              {item.icon && (
                <span className="material-symbols-outlined text-base">
                  {item.icon}
                </span>
              )}
              <span>{item.label}</span>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
