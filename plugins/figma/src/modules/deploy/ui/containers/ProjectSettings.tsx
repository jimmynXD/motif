import { TopActionNav, trpc } from "@/meta/ui"
import { EditDeleteButtons, PageLayout } from "@/tokens/ui"
import clsx from "clsx"
import { FC } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"

export const ProjectSettings: FC = () => {
  const { workspaceId } = useParams()
  const [data, { refetch }] =
    trpc.api.project.getAllProjectsInWorkspace.useSuspenseQuery({
      id: workspaceId ?? "",
    })
  const navigate = useNavigate()

  const deleteProjectMutation = trpc.api.project.deleteProject.useMutation()

  const deleteProject = async (projectId: string) => {
    try {
      await deleteProjectMutation.mutateAsync({
        // wkspcId: workspaceId ?? "",
        projectId,
      })
      await refetch()
    } catch (error) {
      console.error(error)
    }
  }

  const _onClickBack = () => {
    return navigate(-1)
  }

  const _onClickSave = () => {
    return navigate(-1)
  }
  return (
    <PageLayout>
      <TopActionNav
        onClickSave={_onClickSave}
        onClickBack={_onClickBack}
        backLabel="Deploy"
        title="Settings"
      >
        <div className="pt-8">
          <div
            className={clsx(
              "pl-4 pr-5",
              "flex items-end justify-between",
              "text-[#3C3C43]/60 dark:text-[#EBEBF5]/60 text-[13px] leading-none"
            )}
          >
            <span className="uppercase">Select</span>
            <NavLink
              to={`/deploy/new/${workspaceId}`}
              className="flex items-center text-xd-primary-purple-700 dark:text-[#D0B4FF] space-x-1"
            >
              <span className="text-sm material-symbols-rounded leading-none">
                add
              </span>
              <span>New DS</span>
            </NavLink>
          </div>
          <section className={clsx("mt-2 mx-3")}>
            {data.map(
              (project, index) =>
                project && (
                  <div
                    key={index}
                    className={clsx(
                      "relative group overflow-hidden",
                      "first:rounded-t-lg last:rounded-b-lg flex items-start",
                      "space-x-2 py-2 border-b border-b-black/10 dark:border-b-white/[.15] last:border-b-0",
                      "text-sm bg-white dark:bg-[#1C1C1E] dark:text-white"
                    )}
                  >
                    <div
                      className={clsx(
                        "ml-2 flex items-center justify-center",
                        "w-6 h-6 rounded-full",
                        "ring-1 ring-inset ring-white/20",
                        "bg-xd-primary-purple-700"
                      )}
                    >
                      <span className="hidden material-symbols-rounded text-xl">
                        check
                      </span>
                    </div>
                    <span className={clsx("flex-1 font-medium")}>
                      {project.name}
                    </span>
                    <EditDeleteButtons
                      onClickEdit={() =>
                        navigate(`/deploy/edit/${project.id}/${project.name}`)
                      }
                      onClickDelete={() => {
                        deleteProject(project.id)
                      }}
                    />
                  </div>
                )
            )}
          </section>
        </div>
      </TopActionNav>
    </PageLayout>
  )
}
