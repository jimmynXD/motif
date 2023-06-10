import { FC } from "react"
import { EditDeleteButtons, EmptySection } from "../components"
import clsx from "clsx"
import { trpc } from "@/meta/ui"
import { useNavigate } from "react-router-dom"
import { replacePeriods } from "@/tokens/main/utils"

export const ColorPage: FC = () => {
  const navigate = useNavigate()
  const [data, { refetch }] = trpc.figma.token.getTokens.useSuspenseQuery()

  const deleteColorTokenMutation =
    trpc.figma.token.deleteColorToken.useMutation()

  return !!data.colors && data.colors.length > 0 ? (
    <div className="pt-8">
      <header
        className={clsx(
          "pl-4 pr-5",
          "flex justify-between items-end",
          "text-[#3C3C43]/60 dark:text-[#EBEBF5]/60 text-[13px] leading-none uppercase"
        )}
      >
        <span>Token</span>
        <span>HEX</span>
      </header>
      <section className={clsx("mt-2 mx-3")}>
        {data?.colors.map(
          (color, index) =>
            color && (
              <div
                key={index}
                className={clsx(
                  "relative group overflow-hidden",
                  "first:rounded-t-lg last:rounded-b-lg flex items-start",
                  "space-x-2 py-2 border-b border-b-black/10 dark:border-b-white/[.15] last:border-b-0",
                  "text-sm bg-white dark:bg-[#1C1C1E] dark:text-white"
                )}
              >
                <span
                  style={{ backgroundColor: color.hex }}
                  className={clsx(
                    "ml-2 flex items-center justify-center",
                    "w-6 h-6 rounded-full",
                    "ring-1 ring-inset ring-white/20"
                  )}
                />
                <span className={clsx("flex-1 font-medium")}>
                  {color.name.replace(/\./g, "-")}
                </span>
                <span className="uppercase pr-2">{color.hex}</span>
                <EditDeleteButtons
                  onClickEdit={() =>
                    navigate(
                      `/color/${replacePeriods(color.name)}/${color.id.replace(
                        /S:/g,
                        ""
                      )}`
                    )
                  }
                  onClickDelete={async () => {
                    await deleteColorTokenMutation.mutateAsync({ ...color })
                    refetch()
                  }}
                />
              </div>
            )
        )}
      </section>
    </div>
  ) : (
    <EmptySection imgSrc={require("../assets/no-color.svg")}>
      <p className="pt-8">No color tokens found</p>
    </EmptySection>
  )
}
