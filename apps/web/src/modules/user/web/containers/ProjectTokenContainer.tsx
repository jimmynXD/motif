import { trpc } from "@/meta/web"
import { FC, useState } from "react"
import Tokens from "../assets/tokens.json"
import clsx from "clsx"
import { Button } from "ui"
interface ProjectTokenContainerProps {
  workspaceId: string
}

export const ProjectTokenContainer: FC<ProjectTokenContainerProps> = ({
  workspaceId,
}) => {
  const {
    isLoading: projectIsLoading,
    error: projectError,
    data: projectData,
    refetch: projectRefetch,
  } = trpc.project.getAllProjectsInWorkspace.useQuery({
    id: workspaceId,
  })
  const { isLoading, error, data } = trpc.project.getProjectTokens.useQuery({
    workspaceId,
    projectId: projectData ? projectData[0].id : "",
  })

  const [list, setList] = useState<boolean>(false)

  if (isLoading) {
    return <div className="p-4">Projects Loading...</div>
  }

  if (error) {
    return <div className="p-4">Error</div>
  }

  type RGBTypes = {
    r: number
    g: number
    b: number
  }

  type FontStyle = {
    family: string
    style: string
  }

  type ColorTypes = {
    id: string
    name: string
    hex: string
    rgb: RGBTypes
  }

  type TextTypes = {
    id: string
    name: string
    fontSize: number
    font: FontStyle
    letterSpacing: number
  }

  interface ProjectToken {
    colors: ColorTypes[]
    text: TextTypes[]
  }

  const projectTokens: ProjectToken = Tokens

  return (
    <div className={clsx("page-max-xl py-12 px-8 space-y-12")}>
      <div className="flex justify-between space-x-2 items-end border-b border-b-gray-300 pb-2">
        <h1 className="text-xl lg:text-2xl">Design System 1</h1>
        <div>
          {/* select with 2 options */}
          <select
            className={clsx(
              "border-2 border-gray-500 rounded-md pl-2 pr-8 py-2",
              "dark:bg-transparent dark:text-white dark:border-gray-300"
            )}
          >
            <option defaultChecked>
              <span>v1.2.0</span>
            </option>
            <option>
              <span>v1.1.0</span>
            </option>
            <option>
              <span>v1.0.0</span>
            </option>
          </select>
        </div>
      </div>
      {/* Color Tokens List */}
      <div
        className={clsx(
          "flex flex-col bg-gray-50 rounded-lg px-4 pt-12 pb-4 shadow",
          "dark:bg-transparent dark:shadow-white"
        )}
      >
        <div className="flex items-center space-x-4">
          <h2
            className={clsx(
              "text-center md:text-left text-2xl sm:text-3xl font-bold tracking-wide pb-4 md:pb-0"
            )}
          >
            Color Tokens
          </h2>
          <Button
            onPress={() => setList(true)}
            className={clsx("p-2 rounded-full", {
              "hover:bg-gray-300": !list,
              "bg-xd-primary-purple-700 text-white": list,
            })}
          >
            <span className="material-symbols-rounded">List</span>
          </Button>
          <Button
            onPress={() => setList(false)}
            className={clsx("p-2 rounded-full", {
              "hover:bg-gray-300": list,
              "bg-xd-primary-purple-700 text-white": !list,
            })}
          >
            <span className="material-symbols-rounded">grid_view</span>
          </Button>
        </div>
        {!list ? (
          <section className="py-8">
            <div
              className={clsx(
                "font-bold hidden md:grid grid-cols-[200px_1fr_200px_200px] text-sm"
              )}
            >
              <div>Preview</div>
              <div>Token Name</div>
              <div>HEX</div>
              <div>RGB</div>
            </div>
            {projectTokens.colors.map((color) => {
              const periodsToDashName = color.name.replace(/\./g, "-")
              return (
                <div
                  key={color.id}
                  className={clsx(
                    "text-sm py-3 flex flex-col md:grid md:grid-cols-[200px_1fr_200px_200px] items-center",
                    "border-t border-t-gray-300"
                  )}
                >
                  <div
                    style={{ backgroundColor: color.hex }}
                    className="h-12 aspect-video ring-1 ring-gray-300 rounded"
                  />
                  <div className="font-bold md:font-medium">
                    {periodsToDashName}
                  </div>
                  <div>{color.hex}</div>
                  <div>
                    rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b})
                  </div>
                </div>
              )
            })}
          </section>
        ) : (
          <div className={clsx("pl-8 flex flex-wrap py-8")}>
            {projectTokens.colors.map((color) => {
              const periodsToDashName = color.name.replace(/\./g, "-")
              return (
                <div
                  key={color.id}
                  className={clsx("relative flex pr-8 pb-8 last:pr-0")}
                >
                  <div className="space-y-1">
                    <div
                      style={{ backgroundColor: color.hex }}
                      className="h-16 aspect-video w-full rounded dark:ring-1 dark:ring-inset dark:ring-white/10"
                    />
                    <div className="px-[1px] text-sm block">
                      <div className="w-full font-medium text-slate-900 dark:text-white">
                        {periodsToDashName}
                      </div>
                      <div className="text-slate-500 font-mono lowercase dark:text-slate-400">
                        {color.hex}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Text Tokens */}
      <div
        className={clsx(
          "flex flex-col bg-gray-50 rounded-lg px-4 pt-12 pb-4 shadow",
          "dark:bg-transparent dark:shadow-white"
        )}
      >
        <h2
          className={clsx(
            "text-center md:text-left text-2xl sm:text-3xl font-bold tracking-wide pb-4 md:pb-0"
          )}
        >
          Text Tokens
        </h2>
        <div className={clsx("py-8 flex flex-col space-y-4")}>
          {projectTokens.text.map((text) => {
            const periodsToDashName = text.name.replace(/\./g, "-")
            const fontWeight = () => {
              switch (text.font.style) {
                case "regular":
                  return 400
                case "medium":
                  return 500
                case "semibold":
                  return 600
                case "bold":
                  return 700
              }
            }
            return (
              <div
                key={text.id}
                className={clsx(
                  "space-y-[1px] border-t border-t-gray-300 py-3"
                )}
              >
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  {periodsToDashName}
                </div>

                <div
                  style={{
                    fontSize: text.fontSize + "px",
                    fontWeight: fontWeight(),
                  }}
                >
                  The quick brown fox jumps over the lazy dog.
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
