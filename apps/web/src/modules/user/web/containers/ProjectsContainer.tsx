import { FC } from "react"
import { ToastBanner, trpc, Variant } from "@/meta/web"
import { LargeInputButton, ProjectButton } from "../components"
import { format } from "date-fns"
interface ProjectContainerProps {
  workspaceId: string
}

export const ProjectsContainer: FC<ProjectContainerProps> = ({
  workspaceId,
}) => {
  const { isLoading, error, data, refetch } =
    trpc.project.getAllProjectsInWorkspace.useQuery({
      id: workspaceId,
    })

  const createProjectMutation = trpc.project.create.useMutation()
  const deleteProjectMutation = trpc.project.deleteProject.useMutation()
  const updateProjectMutation = trpc.project.update.useMutation()

  const createProject = async (name: string) => {
    try {
      await createProjectMutation.mutateAsync({ name, id: workspaceId })
      await refetch()
      ToastBanner({
        duration: 4000,
        variant: Variant.SUCCESS,
        title: (
          <span>
            Successfully created <b>{name}</b>
          </span>
        ),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteProject = async (name: string, projectId: string) => {
    try {
      await deleteProjectMutation.mutateAsync({
        projectId,
      })
      await refetch()
      ToastBanner({
        duration: 4000,
        variant: Variant.ERROR,
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

  const editProject = async (name: string, projectId: string) => {
    try {
      await updateProjectMutation.mutateAsync({
        name,
        projectId,
      })
      await refetch()
      ToastBanner({
        duration: 4000,
        variant: Variant.SUCCESS,
        title: (
          <span>
            Successfully updated project <b>{name}</b>
          </span>
        ),
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return <div className="p-4">Projects Loading...</div>
  }

  if (error) {
    return <div className="p-4">Error</div>
  }

  return (
    <div className="py-8 grid gap-6 grid-cols-1 md:grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
      <LargeInputButton
        label="Add new project"
        onSubmit={(value) => createProject(value)}
      />
      {data.map((item) => {
        return (
          <ProjectButton
            key={item.id}
            onDeleteClick={() => deleteProject(item.name, item.id)}
            onEditClick={(value: string) => editProject(value, item.id)}
            projectName={item.name}
            updatedAt={
              item?.updatedAt
                ? format(new Date(item?.updatedAt), "MM-dd-yyyy hh:mm a")
                : "--"
            }
          />
        )
      })}
    </div>
  )
}
