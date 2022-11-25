import { ToastBanner, trpc } from "@/meta/web"
import { FC } from "react"

import Link from "next/link"
import clsx from "clsx"
import { InputButton } from "../components"

export const AllWorkspaces: FC = () => {
  const { data, isLoading, error, refetch } =
    trpc.user.getAllWorkspaces.useQuery()

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
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error</h1>
  }

  return (
    <aside
      className={clsx(
        "absolute left-0 top-16 bottom-0 overflow-auto",
        "w-72 border-r border-r-gray-300"
      )}
    >
      <div className="px-4 py-8 flex flex-col justify-center">
        <div>
          <span
            className={clsx(
              "px-2 py-1 rounded-full",
              "text-sm font-medium pb-1",
              "text-white bg-gray-500 "
            )}
          >
            Workspaces
          </span>
        </div>
        {data.map((workspace) => (
          <Link
            className="button button-link justify-start"
            href={`/app/workspace/${workspace.slug}`}
            key={workspace.id}
          >
            {workspace.name}
          </Link>
        ))}

        <InputButton
          className="pt-10"
          inputWrapperClassName="flex-1"
          label="New workspace"
          onSubmit={onWorkspaceSubmit}
        />
      </div>
    </aside>
  )
}
