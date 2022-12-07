import { FC } from "react"
import { ToastBanner, trpc, Variant } from "@/meta/web"
import { LargeInputButton } from "../components"
import { format } from "date-fns"
import clsx from "clsx"
import { Popover } from "ui"
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
  const deleteProjectMutation = trpc.project.deleteProject.useMutation()

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

  const deleteProject = async (name: string, projectId: string) => {
    try {
      await deleteProjectMutation.mutateAsync({
        wkspcId: workspaceId,
        projectId,
      })
      await refetch()
      ToastBanner({
        duration: 4000,
        variant: Variant.INFO,
        title: (
          <span>
            Successfully deleted project <b>{name}</b>
          </span>
        ),
      })
    } catch (error) {
      console.error(error)
    }
  }
  const projectButtonCls = clsx(
    "flex flex-col items-start justify-start",
    "min-h-[140px] text-left relative py-4 px-2 border-2 border-purple-700 rounded-lg transition-all group",
    "cursor-pointer"
  )

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  if (error) {
    return <div className="p-4">Error</div>
  }

  const workspaceMenu = [
    // {
    //   label: "Edit",
    //   icon: "edit",
    //   onClick: () => console.log("edit pressed"),
    // },
    {
      label: "Delete",
      icon: "delete",
      onClick: () => console.log("workspace delete pressed"),
    },
  ]
  return (
    <div className="pl-4 pr-4 md:pt-4 md:pl-0 md:pb-8">
      <div
        className={clsx(
          "flex flex-row justify-center md:justify-start items-baseline space-x-4 space-y-0"
        )}
      >
        <h2 className="font-semibold">{workspaceName}</h2>
        <Popover menuItems={workspaceMenu} />
      </div>
      <div className="pt-8 grid gap-6 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]">
        <LargeInputButton label="Add new project" onSubmit={createProject} />
        {data.map((item) => {
          const projectMenu = [
            // {
            //   label: "Edit",
            //   icon: "edit",
            //   onClick: () => console.log("edit pressed"),
            // },
            {
              label: "Delete",
              icon: "delete",
              onClick: () => deleteProject(item.name, item.id),
            },
          ]
          return (
            <section className={projectButtonCls} key={item.id}>
              <h4
                className={clsx(
                  "flex-1 pr-4",
                  "font-semibold group-hover:text-purple-700"
                )}
              >
                {item.name}
              </h4>
              <div className="absolute top-2 right-2">
                <Popover menuItems={projectMenu} />
              </div>
              <div
                className={clsx("pt-4 flex flex-col items-start", "text-sm")}
              >
                <div className={clsx("text-xs text-gray-700")}>
                  Last update:
                </div>
                <p className="pt-1">
                  {item?.updatedAt
                    ? format(new Date(item?.updatedAt), "MM-dd-yyyy hh:mm a")
                    : "--"}
                </p>
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
