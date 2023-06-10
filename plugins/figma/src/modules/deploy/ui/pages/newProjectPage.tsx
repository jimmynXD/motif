import { TopActionNav, trpc } from "@/meta/ui"
import { FC, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { LabelInput, PageLayout } from "@/tokens/ui"

export const NewProjectPage: FC = () => {
  const navigate = useNavigate()
  const { workspaceId } = useParams()
  const [inputValue, setInputValue] = useState("")
  const createProjectMutation = trpc.api.project.create.useMutation()

  const _onClickBack = () => {
    return navigate(-1)
  }

  const _onClickSave = async () => {
    try {
      await createProjectMutation.mutateAsync({
        name: inputValue,
        id: workspaceId ?? "",
      })
      return navigate(-1)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <PageLayout>
      <TopActionNav
        onClickSave={_onClickSave}
        onClickBack={_onClickBack}
        backLabel="Deploy Settings"
        title="New Design System"
      >
        <div className="pt-8">
          <LabelInput
            onKeyDown={async (e) => {
              if (inputValue.length !== 0 && e.key === "Enter") {
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
