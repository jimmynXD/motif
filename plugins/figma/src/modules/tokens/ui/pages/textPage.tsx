import { FC, useMemo } from "react"
import {
  Badge,
  EditDeleteButtons,
  EmptySection,
  LineHeightIcon,
} from "../components"
import clsx from "clsx"
import { Accordion, trpc } from "@/meta/ui"
import { NavLink, useNavigate } from "react-router-dom"
import { replacePeriods } from "@/tokens/main/utils"

const rootTextName = "default.text"

export const TextPage: FC = () => {
  const navigate = useNavigate()
  const [data, { refetch }] = trpc.figma.token.getTokens.useSuspenseQuery()

  const deleteTextTokenMutation = trpc.figma.token.deleteTextToken.useMutation()

  const textRoot = data?.typography.find((item) => item.name === rootTextName)

  const defaultLabel = (label: string, value: string | number) => (
    <div className="grid grid-cols-[1fr_1fr] gap-x-2">
      <span className="text-[#8A8A8E] dark:text-[#8D8D93]">{label}</span>
      <span className="dark:text-white">{value}</span>
    </div>
  )

  const displayTokens = useMemo(() => {
    if (data?.typography.length > 0 && !textRoot) {
      return true
    }
    if (textRoot && data?.typography.length > 1) return true
    return false
  }, [data?.typography])
  return (
    <>
      {!!textRoot && textRoot ? (
        <section className="pt-8">
          <Accordion
            heading="Default Text Token"
            openComponent={
              <EditDeleteButtons
                left
                onClickEdit={() =>
                  navigate(
                    `/text/default-text/${textRoot.id.replace(/S:/g, "")}`
                  )
                }
                onClickDelete={async () => {
                  await deleteTextTokenMutation.mutateAsync({
                    id: textRoot.id,
                  })
                  try {
                    refetch()
                  } catch (error) {
                    console.log(error)
                  }
                }}
              />
            }
          >
            {defaultLabel("font family", textRoot.font.family)}
            {defaultLabel("size", `${textRoot.fontSize}px`)}
            {defaultLabel("weight", textRoot.font.style)}
            {defaultLabel("line height", textRoot.lineHeight ?? "Auto")}
          </Accordion>
        </section>
      ) : (
        <EmptySection divider imgSrc={require("../assets/no-root.svg")}>
          <div className="pt-4 flex flex-col items-center text-center space-y-4">
            <p>No base tokens found</p>
            <p>
              <NavLink
                to={"/text/default-text"}
                className={clsx("button button-sm button-red space-x-1")}
              >
                <span className="material-symbols-rounded">add</span>
                <span>Default text token</span>
              </NavLink>
            </p>
          </div>
        </EmptySection>
      )}
      {displayTokens ? (
        <div className="pt-8">
          <section className={clsx("mt-2 mx-3")}>
            {data?.typography
              .filter((item) => item.name !== rootTextName)
              .map((text, index) => (
                <div
                  key={index}
                  className={clsx(
                    "relative group overflow-hidden",
                    "flex flex-col p-2",
                    "border-b border-b-black/10 dark:border-b-white/[.15]",
                    "text-sm bg-white dark:bg-[#1C1C1E] dark:text-white",
                    "first:rounded-t-lg last:rounded-b-lg last:border-b-0"
                  )}
                >
                  <div className={clsx("flex")}>
                    <span className="font-medium">
                      {text.name.replace(/\./g, "-")}
                    </span>
                  </div>
                  <div className={clsx("flex flex-wrap")}>
                    <Badge label={text.font.family} />
                    <Badge label={`${text.fontSize}px`} />
                    <Badge label={text.font.style} />
                    <Badge
                      label={text.lineHeight ? text.lineHeight : "Auto"}
                      icon={<LineHeightIcon />}
                    />
                  </div>
                  <EditDeleteButtons
                    onClickEdit={() =>
                      navigate(
                        `/text/${replacePeriods(text.name)}/${text.id.replace(
                          /S:/g,
                          ""
                        )}`
                      )
                    }
                    onClickDelete={async () => {
                      await deleteTextTokenMutation.mutateAsync({
                        id: text.id,
                      })
                      try {
                        refetch()
                      } catch (error) {
                        console.log(error)
                      }
                    }}
                  />
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
