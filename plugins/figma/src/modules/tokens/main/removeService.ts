import { createMainService } from "@/comlinkFigma"

export const removeColorTokens = (sectionName: string[]) => {
  // type guards
  const isRectangle = (val?: SceneNode): val is RectangleNode => !!val

  const isSection = (val?: SceneNode): val is SectionNode =>
    !!val && val.type === "SECTION"

  let allRects: RectangleNode[] = []

  sectionName.forEach((section) => {
    const [findSection] = figma.currentPage
      .findChildren((node) => node.type === "SECTION" && node.name === section)
      .filter(isSection)

    if (!findSection) return
    // find all rectangles inside the section
    // sort alphabetically
    const findRectangles = findSection
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

export const removeTypographyTokens = (sectionName: string[]) => {
  const isText = (val?: SceneNode): val is TextNode => !!val

  const isSection = (val?: SceneNode): val is SectionNode =>
    !!val && val.type === "SECTION"

  let allText: TextNode[] = []

  sectionName.forEach((section) => {
    const [findSection] = figma.currentPage
      .findChildren((node) => node.type === "SECTION" && node.name === section)
      .filter(isSection)

    if (!findSection) return

    const findText = findSection
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
}

export default createMainService(service)
