import { TopActionNav, trpc } from "@/meta/ui"
import { FC, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PageLayout } from "../containers"
import clsx from "clsx"
import { LabelInput } from "../components"
import { SketchPicker, ColorResult, RGBColor } from "react-color"

export const EditColorPage: FC = () => {
  const navigate = useNavigate()
  const { name, id } = useParams()
  const transpileId = "S:" + id

  const [data] = trpc.figma.token.getTokens.useSuspenseQuery()
  const updateColorTokenMutation = trpc.figma.token.updateColor.useMutation()

  const token = data.colors.find((token) => token?.id === transpileId)

  const [color, setColor] = useState({
    r: token?.rgb.r,
    g: token?.rgb.g,
    b: token?.rgb.b,
    a: 1,
  } as RGBColor)

  const [inputValue, setInputValue] = useState(name)

  const _onClickBack = () => {
    return navigate(-1)
  }

  const colorChange = (color: ColorResult) => {
    setColor(color.rgb)
  }

  const _onClickSave = () => {
    updateColorTokenMutation.mutateAsync({
      inputValue: inputValue ?? "",
      id: id ?? "",
      color,
    })
    return navigate(-1)
  }

  return (
    <PageLayout>
      <TopActionNav
        onClickSave={_onClickSave}
        onClickBack={_onClickBack}
        backLabel="Color Token"
        title="Edit Color Token"
      >
        <div className="pt-8">
          <LabelInput
            onKeyDown={async (e) => {
              if (inputValue?.length !== 0 && e.key === "Enter") {
                e.preventDefault()
                _onClickSave()
              }
            }}
            placeholder="Eg. primary-red"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className={clsx("pt-8 flex justify-center px-16")}>
          <SketchPicker
            width="100%"
            presetColors={[]}
            color={color}
            onChange={colorChange}
          />
        </div>
      </TopActionNav>
    </PageLayout>
  )
}
