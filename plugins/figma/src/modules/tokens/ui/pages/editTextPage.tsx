import { TopActionNav, trpc } from "@/meta/ui"
import { FC, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PageLayout } from "../containers"
import clsx from "clsx"
import {
  IconSize,
  InputAutocomplete,
  LabelInput,
  LineHeightIcon,
  NumberInput,
} from "../components"

export const EditTextPage: FC = () => {
  const navigate = useNavigate()
  const { name, id } = useParams()
  const transpileId = "S:" + id

  const [data] = trpc.figma.token.getTokens.useSuspenseQuery()

  const updateTextTokenMutation = trpc.figma.token.updateText.useMutation()
  const token = data.typography.find((token) => token?.id === transpileId)

  const fontFamily = [
    "Red Hat Display",
    "Roboto",
    "Inter",
    "Poppins",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Nunito",
    "Raleway",
    "Oswald",
  ]
  const [inputValue, setInputValue] = useState(name)
  const fontWeight = ["light", "regular", "medium", "semibold", "bold"]
  const [fontSize, setFontSize] = useState(token?.fontSize)
  const [lineHeight, setLineHeight] = useState(token?.lineHeight)
  const [fontSelected, setFontSelected] = useState(token?.font.family)
  const [weightSelected, setWeightSelected] = useState(token?.font.style)

  const _onClickBack = () => {
    return navigate(-1)
  }

  const _onClickSave = async () => {
    updateTextTokenMutation.mutateAsync({
      inputValue: inputValue ?? "",
      id: id ?? "",
      family: fontSelected ?? "",
      style: weightSelected ?? "",
      fontSize: fontSize ?? 0,
      lineHeight: lineHeight ?? 0,
    })
    return navigate(-1)
  }

  return (
    <PageLayout>
      <TopActionNav
        onClickSave={_onClickSave}
        onClickBack={_onClickBack}
        backLabel="Text Token"
        title="Edit Text Token"
      >
        <div className="pt-8">
          <LabelInput
            onKeyDown={async (e) => {
              if (
                inputValue?.length !== 0 &&
                e.key === "Enter" &&
                inputValue !== "default-text"
              ) {
                e.preventDefault()
                _onClickSave()
              }
            }}
            disabled={name === "default-text"}
            placeholder="Eg. h1-primary"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="pt-8">
            <header
              className={clsx(
                "pl-4 pr-5",
                "flex justify-between items-end",
                "text-[#3C3C43]/60 dark:text-[#EBEBF5]/60 text-[13px] leading-none uppercase"
              )}
            >
              <span>Properties</span>
            </header>
            <section className={clsx("mt-2 mx-3")}>
              <div
                className={clsx(
                  "p-4 rounded-lg",
                  "grid grid-cols-2 gap-y-5 gap-x-10",
                  "text-sm bg-white dark:bg-[#1C1C1E] dark:text-white"
                )}
              >
                <div className="col-span-2">
                  <InputAutocomplete
                    items={fontFamily}
                    selected={fontSelected}
                    setSelected={setFontSelected}
                  />
                </div>
                <InputAutocomplete
                  items={fontWeight}
                  selected={weightSelected}
                  setSelected={setWeightSelected}
                />
                <NumberInput value={fontSize ?? 0} setValue={setFontSize} />
                <NumberInput
                  value={lineHeight ?? 0}
                  setValue={setLineHeight}
                  icon={
                    <LineHeightIcon
                      size={IconSize.LG}
                      color="text-[#454B57] before:bg-[#454B57] after:bg-[#454B57] dark:text-gray-100 dark:before:bg-gray-100 dark:after:bg-gray-100"
                    />
                  }
                />
              </div>
            </section>
          </div>
        </div>
      </TopActionNav>
    </PageLayout>
  )
}
