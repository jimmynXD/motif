import { ToastBanner, trpc } from "@/meta/web"
import { FC } from "react"

import Link from "next/link"
import clsx from "clsx"
import { InputButton } from "../components"
import { useRouter } from "next/router"

export const AllWorkspaces: FC = () => {
  const { data, isLoading, error, refetch } =
    trpc.user.getAllWorkspaces.useQuery()

  const router = useRouter()

  const createWorkspaceMutation = trpc.workspace.create.useMutation()

  const createWorkspace = async (name: string) => {
    await createWorkspaceMutation.mutateAsync({ name })
    await refetch()
  }

  const onWorkspaceSubmit = async (workspaceId: string) => {
    try {
      createWorkspace(workspaceId)
      ToastBanner({
        duration: 4000,
        title: (
          <span>
            Successfully created{" "}
            <b className="underline underline-offset-2">{workspaceId}</b>
          </span>
        ),
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  if (error) {
    return <div className="p-4">Error</div>
  }

  return (
    <aside
      className={clsx(
        "md:absolute md:left-0 md:top-0 md:bottom-0 md:w-72 md:block md:overflow-auto",
        "md:border-r md:border-r-gray-300"
      )}
    >
      <div className="p-4 block md:hidden">
        <div className="flex justify-between items-end md:items-center">
          <span className="font-medium">Workspaces</span>
          <span>
            <InputButton
              label="Add new workspace"
              onSubmit={onWorkspaceSubmit}
            />
          </span>
        </div>
        <select
          className={clsx(
            "mt-2 md:mt-0 px-4 py-2 w-full",
            "border border-purple-500 rounded-lg",
            "text-gray-700 bg-white",
            "focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          )}
          defaultValue={data[0].id}
          onChange={(e) => {
            // go to workspace
            router.push(`/app/workspace/${e.target.value}`)
          }}
        >
          {data?.map((workspace) => (
            <option
              key={workspace.id}
              value={workspace.slug !== null ? workspace.slug : workspace.id}
            >
              {workspace.name}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:flex px-4 pt-2 pb-8 flex-col justify-center">
        <div>
          <span className={clsx("pl-4 pr-2 py-2 bg-gray-100 flex rounded-md")}>
            Workspaces
          </span>
        </div>
        <div className="flex flex-col pt-2">
          {data.map((workspace) => (
            <Link
              className={clsx("p-2 flex items-start space-x-1 rounded-md", {
                "bg-purple-200": router.query.workspaceSlug === workspace.slug,
                "hover:bg-purple-100":
                  router.query.workspaceSlug !== workspace.slug,
              })}
              href={`/app/workspace/${workspace.slug}`}
              key={workspace.id}
            >
              <span className="material-symbols-outlined">arrow_right</span>
              <span>{workspace.name}</span>
            </Link>
          ))}
        </div>

        <InputButton label="Add new workspace" onSubmit={onWorkspaceSubmit} />
      </div>
    </aside>
  )
}
