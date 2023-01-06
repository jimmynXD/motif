import clsx from "clsx"
import { FC, Fragment, ReactNode, useState } from "react"
import { Menu, Transition, Dialog } from "@headlessui/react"

export interface FloatingMenuProps {
  label: string
  icon?: string
}

export const FloatingMenu: FC<FloatingMenuProps> = ({
  label,
  icon = "add",
}) => {
  return (
    <Menu as="aside" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={clsx(
            "button button-sm button-icon-ghost",
            "flex-col",
            "text-xs leading-none"
          )}
        >
          <span className="material-symbols-rounded text-xl">{icon}</span>
          <span className="pt-1">{label}</span>
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
            "fixed right-0 left-0 bottom-16 transition-all",
            "bg-[#f1eddd] shadow min-h-[50vh]",
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

export interface FloatingModalProps {
  children: ReactNode
  heading: string
  icon?: string
}

export const FloatingModal: FC<FloatingModalProps> = ({
  children,
  heading,
  icon = "add",
}) => {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div>
        <button
          className={clsx(
            "button button-sm button-icon-ghost",
            "flex-col",
            "text-xs leading-none"
          )}
          onClick={openModal}
        >
          <span className="material-symbols-rounded text-xl">{icon}</span>
          <span className="pt-1">{heading}</span>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <aside className="absolute right-4 top-2">
                    <button onClick={closeModal} className="">
                      <span className="material-symbols-rounded text-lg">
                        close
                      </span>
                    </button>
                  </aside>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <span>New Color Token</span>
                  </Dialog.Title>
                  {children}

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Add Token
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
