import { getColors } from "@/tokens/main/colorService"
import { getTypes } from "@/tokens/main/typographyService"

export const genColorTextJson = () => {
  const localText = getTypes()
  const localColors = getColors()
  const colorAndTextArray = [
    { colors: { ...localColors }, text: { ...localText } },
  ]

  const json = JSON.stringify(colorAndTextArray, null, 2)

  return json
}
