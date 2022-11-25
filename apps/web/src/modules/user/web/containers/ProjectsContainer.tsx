import { FC } from "react"
import { ToastBanner, trpc } from "@/meta/web"
import { InputButton } from "../components"
import { format } from "date-fns"
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

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error</h1>
  }

  return (
    <div className="px-4">
      <div className="flex justify-between">
        <h1>{workspaceName}</h1>
        <div className="">
          <InputButton
            labelRight
            label="Add new project"
            onSubmit={createProject}
          />
        </div>
      </div>
      <div className="pt-8 grid gap-6 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
        {data.map((item) => (
          <button
            className={
              "relative button button-outline h-[200px] border border-purple-700 rounded-lg items-start justify-start flex-col"
            }
            key={item.id}
          >
            <div>{item.name}</div>
            <div className="pt-4 text-gray-500 flex flex-col items-start text-sm font-normal">
              <div>last update:</div>
              <div>
                {item?.updatedAt
                  ? format(new Date(item?.updatedAt), "MM-dd-yyyy hh:mm a")
                  : "--"}
              </div>
            </div>
            <span className="absolute bottom-1 right-1 material-symbols-outlined">
              reply
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
