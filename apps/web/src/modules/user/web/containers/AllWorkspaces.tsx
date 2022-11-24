import { trpc } from "@/meta/web"
import { FC } from "react"

import Link from "next/link"
import clsx from "clsx"

export const AllWorkspaces: FC = () => {
  const { data, isLoading, error, refetch } =
    trpc.user.getAllWorkspaces.useQuery()
  const createWorkspaceMutation = trpc.workspace.create.useMutation()

  const createWorkspace = async (name: string) => {
    await createWorkspaceMutation.mutateAsync({ name })
    await refetch()
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error</h1>
  }

  return (
    <aside
      className={clsx("absolute left-0 top-16 bottom-0", "w-72 bg-red-500")}
    >
      <input
        type="text"
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            createWorkspace(e.currentTarget.value)
          }
        }}
      />
      {data.map((workspace) => (
        <Link href={`/app/workspace/${workspace.slug}`} key={workspace.id}>
          {workspace.name}
        </Link>
      ))}
    </aside>
  )
}
