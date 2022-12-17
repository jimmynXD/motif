import clsx from "clsx"
import { useQuery } from "@tanstack/react-query"
import { getFigmaData } from "../api"
import { DiffStateUI, LoadingUI, TopNav } from "@/meta/ui"
import { mainServices } from "@/meta/ui"
import { useState } from "react"
import { EmptySection } from "../components"

const rootTextName = "root.text"
export const TokenPage = () => {
  const { data, isLoading, error, refetch } = useQuery(["tokens"], getFigmaData)

  const [lastRefresh, setLastRefresh] = useState(
    new Date()
      // 24hour format
      .toLocaleString("en-US", {
        dateStyle: "short",
        timeStyle: "short",
      })
      .replace(/,/g, "")
  )

  const textRoot = data?.textResults.filter(
    (item) => item.name === rootTextName
  )

  const createTokenHandler = async () => {
    const genDSPagePromise = mainServices.tokens.template.genPage()
    const genPrimaryColorTokenPromise =
      mainServices.tokens.template.genColorTokens("Colors - Primary")
    const genSecondaryColorTokenPromise =
      mainServices.tokens.template.genColorTokens("Colors - Secondary")
    const genTypeStyleTokenPromoise =
      mainServices.tokens.template.genTextTokens("Typography")
    const removeUnusedColorTokensPromise =
      mainServices.tokens.remove.removeColorTokens([
        "Colors - Primary",
        "Colors - Secondary",
      ])
    const removeUnusedTextTokensPromise =
      mainServices.tokens.remove.removeTypographyTokens(["Typography"])

    await Promise.all([
      genDSPagePromise,
      genPrimaryColorTokenPromise,
      genSecondaryColorTokenPromise,
      genTypeStyleTokenPromoise,
      removeUnusedColorTokensPromise,
      removeUnusedTextTokensPromise,
    ])

    refetch()
    setLastRefresh(
      new Date()
        .toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        })
        .replace(/,/g, "")
    )
  }

  if (isLoading) {
    return <LoadingUI />
  }

  if (error instanceof Error) {
    return <DiffStateUI subMsg="Try Reloading.">{error?.message}</DiffStateUI>
  }

  if (!data)
    return (
      <DiffStateUI icon="breaking_news_alt_1" subMsg="Try Reloading.">
        No data found.
      </DiffStateUI>
    )

  return (
    <main>
      <TopNav />
      <section className="pt-8 pb-16">
        <div className="flex flex-col items-center space-y-8 px-8">
          <button
            onClick={createTokenHandler}
            className="button button-primary button-sm space-x-2 w-full"
          >
            <span className="flex-1">Compile Style Tokens</span>
            <span className="material-symbols-rounded">loupe</span>
          </button>
        </div>
        <div className="pt-8">
          <div className="leading-5 text-xs text-center bg-xd-secondary-black-rgb text-white">
            Base Text Styles
          </div>
          {!!textRoot && textRoot?.length > 0 ? (
            <div className="pt-2 px-2">
              <table className="text-xs table-auto w-full">
                <thead>
                  <tr>
                    <th className="border-b border-b-xd-neutral-300 font-medium px-4 py-2 text-left text-xd-secondary-black-rgb">
                      Field
                    </th>
                    <th className="border-b border-b-xd-neutral-300 font-medium px-4 py-2 text-left text-xd-secondary-black-rgb">
                      Property
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="group">
                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-success-700",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                      )}
                    >
                      <span>default font color</span>
                    </td>

                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-primary-purple-700 ",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                      )}
                    >
                      {!!data.rootTextColorResults &&
                        data.rootTextColorResults.hex}
                    </td>
                  </tr>
                  <tr className="group">
                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-success-700",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                      )}
                    >
                      <span>default font family</span>
                    </td>

                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-primary-purple-700 ",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                      )}
                    >
                      {textRoot[0].font.family}
                    </td>
                  </tr>
                  <tr className="group">
                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-success-700",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                      )}
                    >
                      <span>default font size</span>
                    </td>

                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-primary-purple-700 ",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                      )}
                    >
                      {textRoot[0].font.size}px
                    </td>
                  </tr>
                  <tr className="group">
                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-success-700",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                      )}
                    >
                      <span>default font weight</span>
                    </td>

                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-primary-purple-700 ",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                      )}
                    >
                      {textRoot[0].font.weight}
                    </td>
                  </tr>
                  <tr className="group">
                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-success-700",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                      )}
                    >
                      <span>default line height</span>
                    </td>

                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-primary-purple-700 ",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                      )}
                    >
                      {textRoot[0].line.height}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <EmptySection imgSrc={require("../assets/no-root.svg")}>
              No base tokens found
            </EmptySection>
          )}
        </div>
        <div className="pt-8">
          <div className="leading-5 text-xs text-center bg-xd-secondary-black-rgb text-white">
            Color Tokens
          </div>
          {!!data?.colorResults && data?.colorResults.length > 0 ? (
            <div className="pt-2 px-2">
              <table className="text-xs table-auto w-full">
                <thead>
                  <tr>
                    <th className="border-b border-b-xd-neutral-300 font-medium px-4 py-2 text-left text-xd-secondary-black-rgb" />

                    <th className="border-b border-b-xd-neutral-300 font-medium px-4 py-2 text-left text-xd-secondary-black-rgb">
                      Token
                    </th>
                    <th className="text-right border-b border-b-xd-neutral-300 font-medium px-4 py-2 text-left text-xd-secondary-black-rgb">
                      Property
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.colorResults.map(
                    (color, index) =>
                      color && (
                        <tr key={index} className="group">
                          <td className="border-b border-b-xd-neutral-300 py-1 group-last:border-b-transparent">
                            <span
                              style={{ backgroundColor: color.hex }}
                              className={clsx(
                                "w-7 h-7 rounded-full inline-block border border-xd-neutral-300 border-inset"
                              )}
                            />
                          </td>
                          <td
                            className={clsx(
                              "px-4 py-2 text-xd-success-700",
                              "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                            )}
                          >
                            {color.name.replace(/\./g, "-")}
                          </td>
                          <td
                            className={clsx(
                              "text-right px-4 py-2 text-xd-primary-black-rgb",
                              "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                            )}
                          >
                            {color.hex}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptySection imgSrc={require("../assets/no-color.svg")}>
              No color tokens found
            </EmptySection>
          )}
        </div>
        <div className="pt-8">
          <div className="leading-5 text-xs text-center bg-xd-secondary-black-rgb text-white">
            Typography Style Tokens
          </div>
          {!!data?.textResults && data?.textResults.length > 0 ? (
            <div className="pt-2 px-2">
              <table className="text-xs table-auto w-full">
                <thead>
                  <tr>
                    <th className="border-b border-b-xd-neutral-300 font-medium px-4 py-2 text-left text-xd-secondary-black-rgb">
                      Token
                    </th>
                    <th className="border-b border-b-xd-neutral-300 font-medium px-4 py-2 text-left text-xd-secondary-black-rgb">
                      Property
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.textResults
                    .filter((item) => item.name !== rootTextName)
                    .map((text, index) => (
                      <tr key={index} className="group">
                        <td
                          className={clsx(
                            "px-4 py-2 text-xd-success-700",
                            "border-b border-b-xd-neutral-300 group-last:border-b-transparent",
                            "align-top"
                          )}
                        >
                          <span>{text.name.replace(/\./g, "-")}</span>
                        </td>
                        <td
                          className={clsx(
                            "px-4 py-2 text-xd-primary-black-rgb",
                            "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                          )}
                        >
                          <div className="text-xd-primary-purple-700 space-x-1">
                            <span>font-size&#58;</span>
                            <span>{text.font.family}</span>
                          </div>
                          <div className="text-xd-primary-purple-700 space-x-1">
                            <span>font-size&#58;</span>
                            <span>{text.font.size}px</span>
                          </div>
                          <div className="text-xd-primary-purple-700 space-x-1">
                            <span>font-weight&#58;</span>
                            <span>{text.font.weight}</span>
                          </div>
                          <div className="text-xd-primary-purple-700 space-x-1">
                            <span>line-height&#58;</span>
                            <span>{text.line.height}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptySection imgSrc={require("../assets/no-text.svg")}>
              No text style tokens found
            </EmptySection>
          )}
        </div>
      </section>
    </main>
  )
}
