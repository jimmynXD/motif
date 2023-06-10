import { TopActionNav, trpc } from "@/meta/ui"
import { FC, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { LabelInput, PageLayout } from "@/tokens/ui"

export const EditProjectPage: FC = () => {
  const navigate = useNavigate()
  const { projectId, name } = useParams()

  const [inputValue, setInputValue] = useState(name)

  const updateProjectMutation = trpc.api.project.update.useMutation()

  const _onClickBack = () => {
    return navigate(-1)
  }

  const _onClickSave = () => {
    updateProjectMutation.mutateAsync({
      name: inputValue ?? "",
      projectId: projectId ?? "",
    })
    return navigate(-1)
  }

  return (
    <PageLayout>
      <TopActionNav
        onClickSave={_onClickSave}
        onClickBack={_onClickBack}
        backLabel="Deploy"
        title="New Design System"
      >
        <div className="pt-8">
          <LabelInput
            onKeyDown={async (e) => {
              if (inputValue?.length !== 0 && e.key === "Enter") {
                e.preventDefault()
                _onClickSave()
              }
            }}
            placeholder="Eg. project 1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </TopActionNav>
    </PageLayout>
  )
}
