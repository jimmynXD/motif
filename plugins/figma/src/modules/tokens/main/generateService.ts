import { createMainService } from "@/comlinkFigma"
import { accessSection, rgbToHex, rgbValue } from "./utils"

export const genPage = () => {
  const root = figma.root

  const hasDSPage =
    root.children.filter((page) =>
      page.name.toLowerCase().endsWith("design system")
    ).length > 0

  if (!hasDSPage) {
    const createPage = figma.createPage()
    return (createPage.name = "Design System")
  }

  return console.log("Design System page already exists")
}

export const genColorTokens = (sectionName: string, prefix?: string) => {
  const dsPage = figma.root.children.filter((page) =>
    page.name.toLowerCase().endsWith("design system")
  )[0]

  // jump to dsPage
  if (figma.currentPage !== dsPage) {
    figma.currentPage = dsPage
    alert("Redirecting to the Design System page")
  }

  // type guards
  const isRectangle = (val?: SceneNode): val is RectangleNode => !!val

  // find all rectangles inside the section
  // sort alphabetically
  const findRectangles = accessSection(sectionName)
    .findAll((node) => node.type === "RECTANGLE")
    .filter(isRectangle)
    .sort((a, b) => a.name.localeCompare(b.name))

  // generate color tokens from each rectangle
  findRectangles.forEach((rec) => {
    const colors: Paint[] = []

    // check if token exists
    const existingStyle = figma
      .getLocalPaintStyles()
      .find(({ name: localName }) => localName === rec.name.toLowerCase())

    // update existing token or create new token
    const newStyle = existingStyle ?? figma.createPaintStyle()

    if (!Array.isArray(rec.fills) || rec.fills.length <= 0) return

    // exit if there are no changes
    if (existingStyle?.id === rec.fillStyleId) return console.log("no changes")

    rec.fills.forEach((item) => {
      colors.push(item)
    })

    newStyle.name = prefix
      ? prefix + "/" + rec.name.toLowerCase()
      : rec.name.toLowerCase()

    newStyle.description = `${rec.name.toLowerCase()} #${rgbToHex(
      rgbValue(rec.fills[0].r),
      rgbValue(rec.fills[0].g),
      rgbValue(rec.fills[0].b)
    )}`
    newStyle.paints = colors
    rec.fillStyleId = newStyle.id
  })
}

export const genTextTokens = (sectionName: string) => {
  const dsPage = figma.root.children.filter((page) =>
    page.name.toLowerCase().endsWith("design system")
  )[0]

  // jump to dsPage
  if (figma.currentPage !== dsPage) {
    figma.currentPage = dsPage
    alert("Redirecting to the Design System page")
  }

  // type guards
  const isText = (val?: SceneNode): val is TextNode => !!val

  // find all text nodes inside the section
  const findText = accessSection(sectionName)
    .findAll((node) => node.type === "TEXT")
    .filter(isText)
    .sort((a, b) => a.name.localeCompare(b.name))

  findText.forEach(async (text) => {
    const { family, style } = text.fontName as FontName

    // check if token exists
    const existingStyle = figma
      .getLocalTextStyles()
      .find(({ name: localName }) => localName === text.name.toLowerCase())

    // Load font first to get attributes
    await figma.loadFontAsync({ family, style })
    try {
      // update existing token or create new token
      const newStyle = existingStyle ?? figma.createTextStyle()

      // exit if there are no changes
      if (existingStyle?.id === text.textStyleId)
        return console.log("no changes")

      newStyle.name = text.name.toLowerCase()
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

export const service = {
  genPage,
  genColorTokens,
  genTextTokens,
}

export default createMainService(service)
