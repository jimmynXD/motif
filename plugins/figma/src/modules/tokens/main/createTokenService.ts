import { RGBColor } from "react-color"
import {
  capitalize,
  findFrame,
  replaceSlashesAndSpacesWithDashes,
  replaceDashesWithSlashes,
  reverseRgbValue,
  findText,
  findRectangle,
} from "./utils"

export const createTextToken = async (
  name: string,
  inputName: string,
  family: string,
  style: string,
  fontSize: number,
  lineHeight: number
) => {
  const transpileName = replaceSlashesAndSpacesWithDashes(inputName)

  // check if there are similar elements with the same name, but different numbers
  const similarElements = findText(name).filter(
    (text) => text.name.replace(/-\d+$/, "") === transpileName
  )

  // Create token and give it a different name if name already exists
  const compileName =
    similarElements.length > 0
      ? `${transpileName.replace(/-\d+$/, "")}-${similarElements.length + 1}`
      : transpileName

  await figma.loadFontAsync({
    family,
    style: capitalize(style),
  })
  try {
    const createToken = figma.createTextStyle()
    createToken.name = replaceDashesWithSlashes(compileName)
    createToken.fontName = {
      family,
      style: capitalize(style),
    } as FontName
    createToken.fontSize = fontSize as number
    createToken.lineHeight =
      lineHeight !== 0
        ? {
            value: lineHeight,
            unit: "PIXELS",
          }
        : { unit: "AUTO" }
    createToken.description = `token: ${compileName}`

    const createElement = figma.createText()
    createElement.name = compileName
    createElement.textStyleId = createToken.id
    findFrame(name).appendChild(createElement)

    return (createElement.characters =
      "The spectacle before us was indeed sublime")
  } catch (error) {
    console.error("create Text Token error: ", error)
  }
}

export const createColorToken = (
  name: string,
  inputName: string,
  color: RGBColor
) => {
  const transpileName = replaceSlashesAndSpacesWithDashes(inputName)
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

  // check if there are similar elements with the same name, but different numbers
  const similarElements = findRectangle(name).filter(
    (color) => color.name.replace(/-\d+$/, "") === transpileName
  )

  // Create token and give it a different name if name already exists
  const compileName =
    similarElements.length > 0
      ? `${transpileName.replace(/-\d+$/, "")}-${similarElements.length + 1}`
      : transpileName

  const createToken = figma.createPaintStyle()
  createToken.name = replaceDashesWithSlashes(compileName)
  createToken.paints = colors
  createToken.description = `token: ${compileName}`

  const createElement = figma.createRectangle()
  createElement.name = compileName

  createElement.fillStyleId = createToken.id

  return findFrame(name).appendChild(createElement)
}
