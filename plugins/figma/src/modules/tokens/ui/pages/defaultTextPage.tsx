import { TopActionNav, trpc } from "@/meta/ui"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "../containers"
import clsx from "clsx"
import {
  IconSize,
  InputAutocomplete,
  LabelInput,
  LineHeightIcon,
  NumberInput,
} from "../components"

export const DefaultTextPage: FC = () => {
  const navigate = useNavigate()

  const createTextTokenMutation = trpc.figma.token.createText.useMutation()

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

  const fontWeight = ["light", "regular", "medium", "semibold", "bold"]
  const [fontSize, setFontSize] = useState<number>(16)
  const [lineHeight, setLineHeight] = useState<number>(16)
  const [fontSelected, setFontSelected] = useState(fontFamily[0])
  const [weightSelected, setWeightSelected] = useState(fontWeight[1])

  const _onClickBack = () => {
    return navigate(-1)
  }

  const _onClickSave = () => {
    createTextTokenMutation.mutateAsync({
      inputValue: "default-text",
      inputFamily: fontSelected,
      inputWeight: weightSelected,
      inputSize: fontSize,
      inputLineHeight: lineHeight,
    })
    return navigate(-1)
  }

  return (
    <PageLayout>
      <TopActionNav
        onClickSave={_onClickSave}
        onClickBack={_onClickBack}
        backLabel="Text Token"
        title="New Text Token"
      >
        <div className="pt-8">
          <LabelInput disabled placeholder="Default Text Token" />
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
                <NumberInput value={fontSize} setValue={setFontSize} />
                <NumberInput
                  value={lineHeight}
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
