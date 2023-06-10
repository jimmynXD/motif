import { createMainService } from "@/comlinkFigma"
import { findFrame, findRectangle, findText } from "./utils"

export const deleteColorToken = (frame: string, id: string) => {
  const findColorToken = figma.getStyleById(id) as PaintStyle

  const findColorElement = findRectangle(frame).find(
    (rect) => rect.fillStyleId === id
  )

  findColorToken.remove()
  return findColorElement?.remove()
}

export const deleteTextToken = (frame: string, id: string) => {
  const matchingElement = findText(frame).find(
    (token) => token.textStyleId === id
  )

  const matchingToken = figma.getStyleById(id) as TextStyle

  matchingToken.remove()
  return matchingElement?.remove()
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
  removeTypographyTokens,
  deleteColorToken,
  deleteTextToken,
}

export default createMainService(service)
