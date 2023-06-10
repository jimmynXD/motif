import { Tab } from "@headlessui/react"
import clsx from "clsx"
import { FC, ReactNode } from "react"

interface TabsProps {
  contentArray: {
    title: string
    content: ReactNode
  }[]
}

export const Tabs: FC<TabsProps> = ({ contentArray }) => {
  return (
    <Tab.Group>
      <Tab.List
        as="nav"
        className={clsx(
          "sticky top-0 inset-x-0 z-10 overflow-hidden bg-white/70 backdrop-blur-md",
          "shadow-[inset_0_-1px_0_0_rgb(0_0_0_/_0.1)]",
          "dark:shadow-[inset_0_-1px_0_0_rgb(255_255_255_/_0.1)]",
          "dark:bg-black/70"
        )}
      >
        <div className="px-8 flex overflow-x-auto space-x-4">
          {contentArray.map((content, index) => (
            <Tab
              key={index}
              as={"a"}
              className={({ selected }) =>
                clsx(
                  "whitespace-nowrap",
                  "relative cursor-pointer px-3 py-2 select-none",
                  "text-sm before:rounded before:absolute before:content-[''] before:h-[2px] before:bottom-0 before:inset-x-0 before:transition-all",
                  {
                    "text-black dark:text-white drop-shadow-sm before:bg-black dark:before:bg-white":
                      selected,
                    "text-gray-600 dark:text-gray-100 hover:before:bg-gray-300":
                      !selected,
                  }
                )
              }
            >
              {content.title}
            </Tab>
          ))}
        </div>
      </Tab.List>
      <Tab.Panels as="main" className={clsx("page-max-xl px-8")}>
        {contentArray.map((content, index) => (
          <Tab.Panel key={index} as="section">
            {content.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
