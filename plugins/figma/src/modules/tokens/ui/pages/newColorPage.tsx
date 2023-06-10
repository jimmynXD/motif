import { TopActionNav, trpc } from "@/meta/ui"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "../containers"
import clsx from "clsx"
import { LabelInput } from "../components"
import { SketchPicker, ColorResult, RGBColor } from "react-color"

export const NewColorPage: FC = () => {
  const navigate = useNavigate()

  const [color, setColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  } as RGBColor)

  const [inputValue, setInputValue] = useState("")

  const createColorTokenMutation = trpc.figma.token.createColor.useMutation()

  const _onClickBack = () => {
    return navigate(-1)
  }

  const colorChange = (color: ColorResult) => {
    setColor(color.rgb)
  }

  const _onClickSave = () => {
    createColorTokenMutation.mutateAsync({
      inputValue: inputValue,
      color: color,
    })
    return navigate(-1)
  }

  return (
    <PageLayout>
      <TopActionNav
        onClickSave={_onClickSave}
        onClickBack={_onClickBack}
        backLabel="Color Token"
        title="New Color Token"
      >
        <div className="pt-8">
          <LabelInput
            onKeyDown={async (e) => {
              if (inputValue.length !== 0 && e.key === "Enter") {
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
            onChangeComplete={colorChange}
          />
        </div>
      </TopActionNav>
    </PageLayout>
  )
}
