import { Accordion, trpc } from "@/meta/ui"
import { EmptySection } from "@/tokens/ui"
import clsx from "clsx"
import { format } from "date-fns"
import { FC } from "react"
import { NavLink } from "react-router-dom"

interface ProjectContainerProps {
  workspaceId: string
}
export const ProjectsContainer: FC<ProjectContainerProps> = ({
  workspaceId,
}) => {
  const [data] = trpc.api.project.getAllProjectsInWorkspace.useSuspenseQuery({
    id: workspaceId,
  })
  const projectZero = data?.[0].id
  const createJsonMutation = trpc.figma.deploy.createJson.useMutation()
  const deployJsonMutation = trpc.api.project.deploy.useMutation()

  const _deploy = async () => {
    const tokens = await createJsonMutation.mutateAsync()
    await deployJsonMutation.mutateAsync({
      workspaceId,
      projectId: projectZero,
      tokens,
    })
  }
  const accordionRow = (label: string, value: string | number) => (
    <div className="grid grid-cols-[auto_1fr] gap-x-2">
      <span className="text-[#8A8A8E] dark:text-[#8D8D93]">{label}</span>
      <span className="dark:text-white">{value}</span>
    </div>
  )
  return !!data && data.length > 0 ? (
    <div className={clsx("pt-8")}>
      <div
        className={clsx(
          "pl-4 pr-5",
          "flex justify-between items-end",
          "text-[#3C3C43]/60 dark:text-[#EBEBF5]/60 text-[13px] leading-none"
        )}
      >
        <span className="uppercase">Project</span>
      </div>
      <section className={clsx("mt-2")}>
        <Accordion
          defaultOpen
          heading={<span className="font-semibold">{data[0]?.name}</span>}
        >
          {accordionRow(
            "Last update:",
            data[0]?.updatedAt
              ? format(new Date(data[0]?.updatedAt), "MM-dd-yyyy hh:mm a")
              : "--"
          )}
        </Accordion>
      </section>
      <div className="py-16 flex flex-col items-center justify-center">
        <p>
          <button
            onClick={_deploy}
            className={clsx("button button-sm button-primary space-x-1")}
          >
            <span className="material-symbols-rounded">send</span>
            <span>Deploy Your Tokens</span>
          </button>
        </p>
      </div>
    </div>
  ) : (
    <EmptySection imgSrc={require("../assets/no-text.svg")}>
      <div className="pt-4 flex flex-col items-center text-center space-y-4">
        <p>No design system found</p>
        <p>
          <NavLink
            to={`/deploy/new/${workspaceId}`}
            className={clsx("button button-sm button-red space-x-1")}
          >
            <span className="material-symbols-rounded">add</span>
            <span>New design system</span>
          </NavLink>
        </p>
      </div>
    </EmptySection>
  )
}
