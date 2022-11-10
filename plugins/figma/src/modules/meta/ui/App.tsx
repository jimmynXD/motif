import * as React from "react"
import { Tab } from "@headlessui/react"
import "./style/globals.css"
import mainServices from "./mainService"
import clsx from "clsx"
declare function require(path: string): any

function App() {
  const TabArray = ["Tokens", "Deploy"]
  const contentArray = [
    {
      heading: "Color",
      buttonText: "Add motifXD Color Tokens",
      buttonIcon: "arrow_right_alt",
      buttonOnClick: () => mainServices.color.getColors(),
      img: require("./color-svg.svg"),
      emptyTitle: "No color tokens found",
      emptySubtitle: "Add color tokens to start",
    },
    {
      heading: "Text",
      buttonText: "Add motifXD Text Style Tokens",
      buttonIcon: "arrow_right_alt",
      buttonOnClick: () => mainServices.typography.getTypes(),
      img: require("./text-svg.svg"),
      emptyTitle: "No text style tokens found",
      emptySubtitle: "Add text style tokens to start",
    },
  ]
  return (
    <main>
      <Tab.Group>
        <Tab.List className="flex bg-white sticky top-0 z-10">
          {TabArray.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                clsx(
                  "text-sm py-2 text-xd-secondary-black-rgb w-full border-b-2",
                  "focus-visible:outline-none",
                  {
                    "text-xd-primary-purple-700  border-b-xd-primary-purple-700":
                      selected,
                    "border-b-xd-neutral-300": !selected,
                  }
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className={clsx("py-8")}>
            <div className="flex justify-center">
              <button
                className={clsx(
                  "button button-sm space-x-2 border-solid border border-[#F8B630] bg-[#F8B630]/10",
                  "hover:bg-[#F8B630]/50"
                )}
                onClick={() => {
                  mainServices.typography.getTypes()
                  mainServices.color.getColors()
                }}
              >
                <span>Pull In Updates</span>
                <span className="material-symbols-rounded">refresh</span>
              </button>
            </div>
            {contentArray.map((content, index) => (
              <div key={index} className="pt-8">
                <div className="py-1 text-xs text-center bg-xd-secondary-black-rgb text-white">
                  {content.heading}
                </div>
                <div className="pt-10 flex flex-col items-center text-center">
                  <img
                    alt="image for section"
                    src={content.img}
                    className="w-16"
                  />
                  <div className="pt-5 text-sm">
                    <div className="font-medium">{content.emptyTitle}</div>
                    <div className="text-xd-disabled-black-rgb">
                      {content.emptySubtitle}
                    </div>
                  </div>
                  <div className="pt-5">
                    <button
                      className={clsx(
                        "button button-sm space-x-2 border-solid border border-[#4589C9]",
                        "hover:bg-[#4589C9]/10"
                      )}
                      onClick={content.buttonOnClick}
                    >
                      <span>{content.buttonText}</span>
                      <span className="material-symbols-rounded">
                        {content.buttonIcon}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </main>
  )
}

export default App
