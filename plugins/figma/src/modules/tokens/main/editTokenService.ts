import { RGBColor } from "react-color"
import {
  capitalize,
  findRectangle,
  findText,
  replaceDashesWithSlashes,
  reverseRgbValue,
} from "./utils"

export const updateTextToken = async (
  inputName: string,
  id: string,
  family: string,
  style: string,
  fontSize: number,
  lineHeight: number
) => {
  const transpileName = replaceDashesWithSlashes(inputName)
  const transpileId = "S:" + id
  const textTokenArray = figma.getLocalTextStyles()

  const matchingElement = findText("Typography").find(
    (token) => token.textStyleId === transpileId
  )

  const matchingToken = textTokenArray.find(
    (token) => token.id === matchingElement?.textStyleId
  )

  if (!matchingToken)
    return console.warn("No matching token found for ", inputName)

  if (!matchingElement)
    return console.warn("No matching element found for ", inputName)

  await figma.loadFontAsync({
    family,
    style: capitalize(style),
  })
  try {
    matchingElement.name = inputName
    matchingToken.name = transpileName
    matchingToken.fontName = {
      family,
      style: capitalize(style),
    } as FontName
    matchingToken.fontSize = fontSize as number
    matchingToken.lineHeight =
      lineHeight !== 0
        ? {
            value: lineHeight,
            unit: "PIXELS",
          }
        : { unit: "AUTO" }
    matchingToken.description = `token: ${inputName}`
    matchingElement.textStyleId = matchingToken.id
    return console.log(inputName, " has been updated")
  } catch (error) {
    console.error("update Text Token error: ", error)
  }
}

export const updateColorToken = (
  inputName: string,
  id: string,
  color: RGBColor
) => {
  const colors: Paint[] = []
  colors.push({
    type: "SOLID",
    color: {
      r: reverseRgbValue(color.r),
      g: reverseRgbValue(color.g),
      b: reverseRgbValue(color.b),
    },
    opacity: color.a,
    visible: true,
  })
  const transpileName = replaceDashesWithSlashes(inputName)
  const transpileId = "S:" + id
  const colorTokens = figma.getLocalPaintStyles()

  const findToken = colorTokens.find((token) => token.id === transpileId)
  const findElement = findRectangle("Colors").find(
    (element) => element.fillStyleId === transpileId
  )

  if (findElement) {
    if (findToken) {
      findElement.fills = colors
      findElement.name = inputName
      findToken.name = transpileName
      findToken.paints = colors
      findToken.description = `token: ${inputName}`
      findElement.fillStyleId = findToken.id
    }
  }
  return console.log(inputName, " has been updated")
}
