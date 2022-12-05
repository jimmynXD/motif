import { FC } from "react"
import { ToastBanner, trpc } from "@/meta/web"
import { LargeInputButton } from "../components"
import { format } from "date-fns"
import clsx from "clsx"
interface ProjectContainerProps {
  workspaceId: string
  workspaceName: string
}
export const ProjectsContainer: FC<ProjectContainerProps> = ({
  workspaceId,
  workspaceName,
}) => {
  const { isLoading, error, data, refetch } =
    trpc.project.getAllProjectsInWorkspace.useQuery({
      id: workspaceId,
    })

  const createProjectMutation = trpc.project.create.useMutation()

  const createProject = async (name: string) => {
    try {
      await createProjectMutation.mutateAsync({ name, id: workspaceId })
      await refetch()
      ToastBanner({
        duration: 4000,
        title: (
          <span>
            Successfully created <b>{name}</b>
          </span>
        ),
        children:
          "Next steps is to be on the lookout for an email from us. We anticipate before the new year.",
      })
    } catch (error) {
      console.error(error)
    }
  }

  const projectButtonCls = clsx(
    "flex flex-col items-start justify-start",
    "min-h-[140px] text-left relative py-4 px-2 border-2 border-purple-700 rounded-lg transition-all group",
    "hover:bg-purple-600 hover:text-white"
  )
  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  if (error) {
    return <div className="p-4">Error</div>
  }

  return (
    <div className="pl-4 pr-4 md:pt-4 md:pl-0 md:pb-8">
      <div
        className={clsx(
          "flex flex-col items-center space-y-2",
          "md:flex-row md:justify-between md:space-y-0"
        )}
      >
        <h2 className="font-semibold">{workspaceName}</h2>
      </div>
      <div className="pt-8 grid gap-6 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
        <LargeInputButton label="Add new project" onSubmit={createProject} />
        {data.map((item) => (
          <button className={projectButtonCls} key={item.id}>
            <h4 className="pr-4">{item.name}</h4>
            <span
              className={clsx(
                "absolute right-1 top-4",
                "material-symbols-outlined"
              )}
            >
              bolt
            </span>

            <div className={clsx("pt-4 flex flex-col items-start", "text-sm")}>
              <div
                className={clsx(
                  "text-xs bg-gray-500 text-white rounded-full px-2 py-1",
                  "group-hover:bg-white group-hover:text-black"
                )}
              >
                Last update:
              </div>
              <p className="pt-1">
                {item?.updatedAt
                  ? format(new Date(item?.updatedAt), "MM-dd-yyyy hh:mm a")
                  : "--"}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
