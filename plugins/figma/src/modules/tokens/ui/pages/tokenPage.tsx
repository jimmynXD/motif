import clsx from "clsx"
import { useQuery } from "@tanstack/react-query"
import { getFigmaData } from "../api"
import { TopNav, XDButton } from "@/meta/ui/components"

export const TokenPage = () => {
  const { data, isLoading, error, refetch } = useQuery(["tokens"], getFigmaData)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (error instanceof Error) {
    return <span>{error?.message}</span>
  }

  if (!data) return <span>no data</span>

  return (
    <main>
      <TopNav />
      <section className="py-8">
        <div className="flex justify-center">
          <XDButton
            onClick={() => {
              refetch()
            }}
          >
            <span>Pull In Updates</span>
            <span className="material-symbols-rounded">refresh</span>
          </XDButton>
        </div>
        <div className="pt-8">
          <div className="leading-5 text-xs text-center bg-xd-secondary-black-rgb text-white">
            Color Tokens
          </div>
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
                          {color.token.replace(/\./g, "-")}
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
        </div>
        <div className="pt-8">
          <div className="leading-5 text-xs text-center bg-xd-secondary-black-rgb text-white">
            Typography Style Tokens
          </div>
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
                {data?.textResults.map((text, index) => (
                  <tr key={index} className="group">
                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-success-700",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent",
                        "align-top"
                      )}
                    >
                      <span>{text.token.replace(/\./g, "-")}</span>
                    </td>
                    <td
                      className={clsx(
                        "px-4 py-2 text-xd-primary-black-rgb",
                        "border-b border-b-xd-neutral-300 group-last:border-b-transparent"
                      )}
                    >
                      <div className="text-xd-primary-purple-700 space-x-1">
                        <span>font-size&#58;</span>
                        <span>{text.fontSize}px</span>
                      </div>
                      <div className="text-xd-primary-purple-700 space-x-1">
                        <span>font-weight&#58;</span>
                        <span>{text.fontWeight}</span>
                      </div>
                      <div className="text-xd-primary-purple-700 space-x-1">
                        <span>line-height&#58;</span>
                        <span>{text.lineHeight}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}
