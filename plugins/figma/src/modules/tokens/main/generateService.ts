import { createMainService } from "@/comlinkFigma"
import {
  DSName,
  capitalize,
  findDSPage,
  findFrame,
  findSection,
  replaceDashesWithSlashes,
  replaceSlashesAndSpacesWithDashes,
  reverseRgbValue,
  rgbToHex,
  rgbValue,
} from "./utils"
import { RGBColor } from "react-color"

export const genPage = () => {
  const root = figma.root

  const DSExists =
    root.children.filter((item) => item.name === DSName()).length > 0

  if (DSExists) return

  const createPage = figma.createPage()
  createPage.name = DSName()

  const dsNode = root.findChild((item) => item.name === DSName()) as PageNode

  root.insertChild(0, dsNode)

  return console.log("Design System page created")
}

export const genSection = (sectionName: string) => {
  if (findSection(sectionName))
    return console.log(sectionName, "already exists")

  const section = figma.createSection()
  section.resizeWithoutConstraints(1920, 1080)
  section.name = sectionName

  if (figma.currentPage !== findDSPage()) {
    return findDSPage().appendChild(section)
  }

  return section
}

export const genFrame = (
  name: string,
  layout: BaseFrameMixin["layoutMode"] = "HORIZONTAL",
  x = 0,
  y = 0,
  itemSpacing = 20
) => {
  if (findFrame(name)) return

  const frame = figma.createFrame()
  frame.locked = true
  frame.name = name
  frame.layoutMode = layout
  frame.primaryAxisSizingMode = "AUTO"
  frame.counterAxisSizingMode = "AUTO"
  frame.x = x
  frame.y = y
  frame.itemSpacing = itemSpacing

  findDSPage().appendChild(frame)
  return console.log(name, " frame created")
}

export const findColorTokens = (name: string) => {
  // type guards
  const isRectangle = (val?: SceneNode): val is RectangleNode => !!val

  if (!findFrame(name)) return console.log(name, " frame cannot be found")

  // get list of local colors
  const localColors = figma.getLocalPaintStyles()

  // find all rectangles inside the frame
  // sort alphabetically
  const findRectangles = findFrame(name)
    .findAll((node) => node.type === "RECTANGLE")
    .filter(isRectangle)
    .sort((a, b) => a.name.localeCompare(b.name))

  // generate color tokens from each rectangle
  findRectangles.forEach((rec) => {
    const colors: Paint[] = []

    // check if token exists
    const existingStyle = localColors.find(
      ({ name: localName }) => localName === rec.name.toLowerCase()
    )

    // update existing token or create new token
    const newStyle = existingStyle ?? figma.createPaintStyle()

    if (!Array.isArray(rec.fills) || rec.fills.length <= 0) return

    // exit if there are no changes
    if (existingStyle?.id === rec.fillStyleId) return console.log("no changes")

    rec.fills.forEach((item) => {
      colors.push(item)
    })

    newStyle.name = replaceDashesWithSlashes(rec.name.toLowerCase())

    newStyle.description = `${rec.name.toLowerCase()} #${rgbToHex(
      rgbValue(rec.fills[0].r),
      rgbValue(rec.fills[0].g),
      rgbValue(rec.fills[0].b)
    )}`
    newStyle.paints = colors
    rec.fillStyleId = newStyle.id
  })
}

export const findTextTokens = (name: string) => {
  // type guards
  const isText = (val?: SceneNode): val is TextNode => !!val

  if (!findFrame(name)) return console.log(name, " frame cannot be found")
  // get list of local text styles
  const localText = figma.getLocalTextStyles()

  // find all rectangles inside the frame
  // sort alphabetically
  const findText = findFrame(name)
    .findAll((node) => node.type === "TEXT")
    .filter(isText)
    .sort((a, b) => a.name.localeCompare(b.name))

  console.log("findText", findText)

  // generate text tokens from each text element
  findText.forEach(async (text) => {
    await figma.loadFontAsync(text.fontName as FontName)

    try {
      const { family, style } = text.fontName as FontName

      const existingStyle = localText.find(
        (local) => local.id === text.textStyleId
      )

      console.log("existing?", existingStyle)
      // update existing token or create new token
      const newStyle = existingStyle ?? figma.createTextStyle()

      // exit if there are no changes
      console.log("existingStyle?.id", existingStyle?.id)
      console.log("text.textStyleId", text.textStyleId)
      console.log("true?", existingStyle?.id === text.textStyleId)

      if (existingStyle?.id === text.textStyleId) {
        return console.log("no changes")
      }

      newStyle.name = replaceDashesWithSlashes(text.name.toLowerCase())
      // set font family first before the other
      newStyle.fontName = text.fontName as FontName
      newStyle.description = `${family} ${style} ${text.fontSize as number}px`
      newStyle.fontSize = text.fontSize as number
      newStyle.lineHeight = text.lineHeight as LineHeight
      newStyle.letterSpacing = text.letterSpacing as LetterSpacing
      newStyle.textCase = text.textCase as TextCase
      newStyle.textDecoration = text.textDecoration as TextDecoration
      text.textStyleId = newStyle.id
    } catch (error) {
      console.log("load error", error)
    }
  })
}

export const genDefaultTextToken = async (
  name: string,
  family: string,
  style: string,
  fontSize: number,
  lineHeight: number
) => {
  await figma.loadFontAsync({
    family,
    style: capitalize(style),
  })
  try {
    const createText = figma.createText()
    createText.name = "default-text"
    createText.fontName = { family, style: capitalize(style) } as FontName
    createText.fontSize = fontSize as number
    createText.lineHeight = {
      value: lineHeight,
      unit: "PIXELS",
    } ?? { unit: "AUTO" }
    createText.characters = "The spectacle before us was indeed sublime"

    findFrame(name).appendChild(createText)

    return findTextTokens(name)
  } catch (error) {
    console.log("error: ", error)
  }
  //   const isText = (val?: SceneNode): val is TextNode => !!val

  //   if (!findFrame(name)) return console.log(name, " cannot be found (genRoot)")
  //   // find the text element labeled text/root
  //   const [findBase] = findFrame(name)
  //     .findAll((node) => node.type === "TEXT")
  //     .filter(isText)
  //     .filter((text) => text.name === "root/text")

  //   if (!findBase) return

  //   if (!Array.isArray(findBase.fills) || findBase.fills.length <= 0) return
  //   const isPaint = (val?: Paint): val is Paint => !!val

  //   // type of solid will have the color object we need
  //   const [style] = findBase.fills.filter(isPaint).map((item) => {
  //     if (item.type === "SOLID") {
  //       return item.color
  //     }
  //   })

  //   return style
}

export const genColorTokens = (
  name: string,
  inputName: string,
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

  const createRect = figma.createRectangle()

  createRect.name = replaceSlashesAndSpacesWithDashes(inputName)
  createRect.fills = colors

  findFrame(name).appendChild(createRect)

  return findColorTokens(name)
}

export const genTextTokens = async (
  name: string,
  inputName: string,
  family: string,
  style: string,
  fontSize: number,
  lineHeight: number
) => {
  await figma.loadFontAsync({
    family,
    style: capitalize(style),
  })
  try {
    const createText = figma.createText()
    createText.name = replaceSlashesAndSpacesWithDashes(inputName)
    createText.fontName = { family, style: capitalize(style) } as FontName
    createText.fontSize = fontSize as number
    createText.lineHeight = {
      value: lineHeight,
      unit: "PIXELS",
    } ?? { unit: "AUTO" }
    createText.characters = "The spectacle before us was indeed sublime"

    findFrame(name).appendChild(createText)

    return findTextTokens(name)
  } catch (error) {
    console.log("error: ", error)
  }
}

export const service = {
  genPage,
  genSection,
  genFrame,
  findColorTokens,
  findTextTokens,
  genColorTokens,
  genTextTokens,
}

export default createMainService(service)
