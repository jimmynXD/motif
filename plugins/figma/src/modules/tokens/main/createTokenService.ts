import { RGBColor } from "react-color"
import {
  capitalize,
  findFrame,
  replaceSlashesAndSpacesWithDashes,
  replaceDashesWithSlashes,
  reverseRgbValue,
  rgbToHex,
} from "./utils"

export const createTextToken = (
  name: string,
  inputName: string,
  family: string,
  style: string,
  fontSize: number,
  lineHeight: number
) => {
  const isText = (val?: SceneNode): val is TextNode => !!val

  const transpileName = replaceSlashesAndSpacesWithDashes(inputName)

  const textTokens = figma.getLocalTextStyles()

  const textElements = findFrame(name)
    .findAll((node) => node.type === "TEXT")
    .filter(isText)
    .sort((a, b) => a.name.localeCompare(b.name))

  const existingText = textElements.find((text) => text.name === transpileName)

  if (!existingText) {
    const createText = async () => {
      await figma.loadFontAsync({
        family,
        style: capitalize(style),
      })
      try {
        const genText = figma.createText()
        genText.name = transpileName
        genText.fontName = {
          family,
          style: capitalize(style),
        } as FontName
        genText.fontSize = fontSize as number
        genText.lineHeight =
          lineHeight !== 0
            ? {
                value: lineHeight,
                unit: "PIXELS",
              }
            : { unit: "AUTO" }
        genText.characters = "The spectacle before us was indeed sublime"

        const genStyle = figma.createTextStyle()
        genStyle.name = replaceDashesWithSlashes(transpileName)
        genStyle.fontName = {
          family,
          style: capitalize(style),
        } as FontName
        genStyle.fontSize = fontSize as number
        genStyle.lineHeight =
          lineHeight !== 0
            ? {
                value: lineHeight,
                unit: "PIXELS",
              }
            : { unit: "AUTO" }
        genStyle.description = `${family} ${capitalize(style)} ${fontSize}px`

        genText.textStyleId = genStyle.id
        return findFrame(name).appendChild(genText)
      } catch (error) {
        console.error("create Text Token error: ", error)
      }
    }
    return createText()
  }

  textElements.forEach(async (element) => {
    await figma.loadFontAsync(element.fontName as FontName)
    try {
      const existingStyle = textTokens.find(
        (token) => token.id === element.textStyleId
      )
      if (existingStyle) {
        existingStyle.fontName = {
          family,
          style: capitalize(style),
        } as FontName
        existingStyle.fontSize = fontSize as number
        existingStyle.lineHeight =
          lineHeight !== 0
            ? {
                value: lineHeight,
                unit: "PIXELS",
              }
            : { unit: "AUTO" }
        element.fontName = {
          family,
          style: capitalize(style),
        } as FontName
        element.fontSize = fontSize as number
        element.lineHeight =
          lineHeight !== 0
            ? {
                value: lineHeight,
                unit: "PIXELS",
              }
            : { unit: "AUTO" }
        element.textStyleId = existingStyle.id
        return existingStyle
      }
    } catch (error) {
      console.error("update Text Token error: ", error)
    }
  })
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

  const isRectangle = (val?: SceneNode): val is RectangleNode => !!val
  const colorTokens = figma.getLocalPaintStyles()
  const colorElements = findFrame(name)
    .findAll((node) => node.type === "RECTANGLE")
    .filter(isRectangle)
    .sort((a, b) => a.name.localeCompare(b.name))

  const existingColor = colorElements.find(
    (color) => color.name === transpileName
  )

  if (!existingColor) {
    const genColorRect = figma.createRectangle()
    genColorRect.name = transpileName
    genColorRect.fills = colors
    const genColorToken = figma.createPaintStyle()
    genColorToken.name = replaceDashesWithSlashes(transpileName)
    genColorToken.paints = colors
    genColorToken.description = `${transpileName} #${rgbToHex(
      color.r,
      color.g,
      color.b
    )}`
    genColorRect.fillStyleId = genColorToken.id
    return findFrame(name).appendChild(genColorRect)
  }

  colorElements.forEach((element) => {
    const existingStyle = colorTokens.find(
      (token) => token.id === element.fillStyleId
    )
    if (existingStyle) {
      existingStyle.paints = colors
      existingStyle.description = `${transpileName} #${rgbToHex(
        color.r,
        color.g,
        color.b
      )}`
      element.fills = colors
      element.fillStyleId = existingStyle.id
      return existingStyle
    }
  })
}
