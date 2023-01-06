import { createMainService } from "@/comlinkFigma"
import { findFrame, replacePeriods } from "./utils"

export const deleteColorToken = (frame: string, name: string, id: string) => {
  const isRectangle = (val?: SceneNode): val is RectangleNode => !!val

  const transpileName = replacePeriods(name)
  const findColorToken = figma.getStyleById(id) as PaintStyle
  const findColorElement = findFrame(frame)
    .children.filter((node) => node.type === "RECTANGLE")
    .filter(isRectangle)
    .find((rect) => rect.name === transpileName)

  findColorToken.remove()
  return findColorElement?.remove()
}

export const deleteTextToken = (frame: string, name: string, id: string) => {
  const isText = (val?: SceneNode): val is TextNode => !!val
  const transpileName = replacePeriods(name)
  const findTextToken = figma.getStyleById(id) as TextStyle
  const findTextElement = findFrame(frame)
    .findAll((node) => node.type === "TEXT")
    .filter(isText)
    .find((txt) => txt.name === transpileName)

  findTextToken.remove()
  return findTextElement?.remove()
}

export const removeColorTokens = (sectionName: string[]) => {
  // type guards
  const isRectangle = (val?: SceneNode): val is RectangleNode => !!val

  let allRects: RectangleNode[] = []

  sectionName.forEach((section) => {
    if (!findFrame(section)) return
    // find all rectangles inside the section
    // sort alphabetically
    const findRectangles = findFrame(section)
      .findAll((node) => node.type === "RECTANGLE")
      .filter(isRectangle)
      .sort((a, b) => a.name.localeCompare(b.name))

    // add rectangles to allRects
    allRects = [...allRects, ...findRectangles]
  })

  // get list of local colors
  const localColors = figma.getLocalPaintStyles()

  const missingColors = localColors.filter(
    (color) => !allRects.find((rect) => rect.fillStyleId === color.id)
  )

  if (missingColors.length > 0) {
    return missingColors.forEach((color) => {
      color.remove()
    })
  }
  return console.log("No missing colors")
}

export const removeTypographyTokens = (frames: string[]) => {
  const isText = (val?: SceneNode): val is TextNode => !!val

  let allText: TextNode[] = []

  frames.forEach((name) => {
    if (!findFrame(name)) return

    const findText = findFrame(name)
      .findAll((node) => node.type === "TEXT")
      .filter(isText)
      .sort((a, b) => a.name.localeCompare(b.name))

    allText = [...allText, ...findText]
  })

  const localTypography = figma.getLocalTextStyles()

  const missingText = localTypography.filter(
    (type) => !allText.find((text) => text.textStyleId === type.id)
  )

  if (missingText.length > 0) {
    return missingText.forEach((text) => {
      text.remove()
    })
  }
}

export const service = {
  removeColorTokens,
  removeTypographyTokens,
  deleteColorToken,
  deleteTextToken,
}

export default createMainService(service)
