import { Disclosure } from "@headlessui/react"
import clsx from "clsx"
import { FC, ReactNode } from "react"

interface AccordionProps {
  children: ReactNode
  defaultOpen?: boolean
  heading: ReactNode
  openComponent?: ReactNode
}
export const Accordion: FC<AccordionProps> = ({
  children,
  defaultOpen = false,
  heading,
  openComponent,
}) => {
  return (
    <Disclosure
      defaultOpen={defaultOpen}
      as={"div"}
      className={clsx(
        "bg-white dark:bg-[#1C1C1E] border-y border-y-[#3C3C43]/40 dark:border-y-[#444444]"
      )}
    >
      {({ open }) => (
        <>
          <div
            className={clsx(
              "relative group overflow-hidden",
              "px-4 flex justify-between items-center w-full dark:text-white"
            )}
          >
            {openComponent && open && openComponent}
            <span className={clsx("py-2 flex-1 text-left")}>{heading}</span>
            <div>
              <Disclosure.Button>
                <span className="material-symbols-rounded">
                  {open ? "expand_less" : "expand_more"}
                </span>
              </Disclosure.Button>
            </div>
          </div>
          <Disclosure.Panel
            as="div"
            className={clsx(
              "pb-4 space-y-1 ml-4 pt-2 px-2 border-t border-t-[#3C3C43]/40 dark:border-t-[#444444] transition-all",
              "text-sm"
            )}
          >
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
