import { FC } from "react"
import { Badge, EmptySection, LineHeightIcon } from "../components"
import clsx from "clsx"
import { trpc } from "@/meta/ui"
import { Disclosure } from "@headlessui/react"
import { NavLink } from "react-router-dom"

const rootTextName = "default.text"

export const TextPage: FC = () => {
  const [data, { refetch }] = trpc.figma.token.getTokens.useSuspenseQuery()

  const deleteTextTokenMutation = trpc.figma.token.deleteTextToken.useMutation()

  const textRoot = data?.typography.find((item) => item.name === rootTextName)

  const defaultLabel = (label: string, value: string | number) => (
    <div className="grid grid-cols-[1fr_1fr] gap-x-2">
      <span className="text-[#8A8A8E] dark:text-[#8D8D93]">{label}</span>
      <span className="dark:text-white">{value}</span>
    </div>
  )

  return (
    <>
      {!!textRoot && textRoot ? (
        <section className="pt-8">
          <Disclosure
            as={"div"}
            className={clsx(
              "py-2",
              "bg-white dark:bg-[#1C1C1E] border-y border-y-[#3C3C43]/40 dark:border-y-[#444444]"
            )}
          >
            {({ open }) => (
              <>
                <div className="px-4 flex justify-between items-center w-full dark:text-white">
                  <span className="flex-1 text-left">Default Text Token</span>
                  <div className={clsx({ "space-x-2": open })}>
                    <button
                      onClick={async () => {
                        await deleteTextTokenMutation.mutateAsync({
                          name: "default-text",
                          id: textRoot.id,
                        })
                        refetch()
                      }}
                      className={clsx({
                        hidden: !open,
                      })}
                    >
                      <span
                        className={clsx(
                          "material-symbols-rounded text-xd-danger-700"
                        )}
                      >
                        delete
                      </span>
                    </button>
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
                    "space-y-1 mt-2 ml-4 pt-2 px-2 border-t border-t-[#3C3C43]/40 dark:border-t-[#444444] transition-all",
                    "text-sm"
                  )}
                >
                  {/* {!!data.rootTextColorResults &&
                    data.rootTextColorResults.hex &&
                    defaultLabel("color", data.rootTextColorResults.hex)} */}
                  {defaultLabel("font family", textRoot.font.family)}
                  {defaultLabel("size", `${textRoot.font.size}px`)}
                  {defaultLabel("weight", textRoot.font.weight)}
                  {defaultLabel("line height", textRoot.line.height ?? "Auto")}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </section>
      ) : (
        <EmptySection divider imgSrc={require("../assets/no-root.svg")}>
          <div className="pt-4 flex flex-col items-center text-center space-y-4">
            <p>No base tokens found</p>
            <p>
              <NavLink
                to={"/text/default"}
                className={clsx("button button-sm button-red space-x-1")}
              >
                <span className="material-symbols-rounded">add</span>
                <span>Default text token</span>
              </NavLink>
            </p>
          </div>
        </EmptySection>
      )}
      {!!data?.typography && data?.typography.length > 0 ? (
        <div className="pt-8">
          <section className={clsx("mt-2 mx-3")}>
            {data?.typography
              .filter((item) => item.name !== rootTextName)
              .map((text, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex flex-col",
                    "p-2",
                    "border-b border-b-black/10 dark:border-b-white/[.15]",
                    "text-sm bg-white dark:bg-[#1C1C1E] dark:text-white",
                    "first:rounded-t-lg last:rounded-b-lg last:border-b-0"
                  )}
                >
                  <div className={clsx("flex justify-between group")}>
                    <span className="flex-1 font-medium">
                      {text.name.replace(/\./g, "-")}
                    </span>
                    <button
                      onClick={async () => {
                        await deleteTextTokenMutation.mutateAsync({ ...text })
                        refetch()
                      }}
                      className={clsx(
                        "flex items-center justify-center",
                        "w-4 h-4 rounded-full"
                      )}
                    >
                      <span
                        className={clsx(
                          "material-symbols-rounded",
                          "transition-all text-lg",
                          "text-transparent group-hover:text-xd-primary-purple-700 dark:group-hover:text-[#D0B4FF]"
                        )}
                      >
                        delete
                      </span>
                    </button>
                  </div>
                  <aside className={clsx("flex flex-wrap")}>
                    <Badge label={text.font.family} />
                    <Badge label={`${text.font.size}px`} />
                    <Badge label={text.font.weight} />
                    <Badge
                      label={text.line.height ? text.line.height : "Auto"}
                      icon={<LineHeightIcon />}
                    />
                  </aside>
                </div>
              ))}
          </section>
        </div>
      ) : (
        <EmptySection imgSrc={require("../assets/no-text.svg")}>
          <p className="pt-8">No text style tokens found</p>
        </EmptySection>
      )}
    </>
  )
}
