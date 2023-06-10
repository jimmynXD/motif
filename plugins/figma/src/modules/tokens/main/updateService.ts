import { findRectangle, findText, replaceDashesWithSlashes } from "./utils"

export const updateMismatchedTextTokens = (name: string) => {
  const textElements = findText(name)
  const textTokens = figma.getLocalTextStyles()

  textTokens.forEach((token) => {
    const matchingElement = textElements.find(
      (element) => element.textStyleId === token.id
    )

    if (!matchingElement) {
      return token.remove()
    }
  })
  // Add token if element does not have a matching token
  textElements.forEach(async (element) => {
    const matchingToken = textTokens.find(
      (token) => token.id === element.textStyleId
    )
    if (!matchingToken) {
      const matchingName = textTokens.filter(
        (token) =>
          token.name.replace(/\/\d+$/, "") ===
          replaceDashesWithSlashes(element.name.replace(/-\d+$/, ""))
      )

      const compileElementName =
        matchingName.length > 0
          ? `${element.name.replace(/-\d+$/, "")}-${matchingName.length + 1}`
          : element.name

      await figma.loadFontAsync(element.fontName as FontName)
      try {
        const createToken = figma.createTextStyle()
        createToken.name = replaceDashesWithSlashes(compileElementName)
        createToken.fontName = element.fontName as FontName
        createToken.fontSize = element.fontSize as number
        createToken.lineHeight = element.lineHeight as LineHeight
        createToken.description = `token: ${compileElementName}`
        element.name = compileElementName
        element.textStyleId = createToken.id
        return createToken
      } catch (error) {
        console.log("mismatch text token error: ", error)
      }
    }
  })
}

export const updateMismatchedColorTokens = (name: string) => {
  const colorElements = findRectangle(name)
  const colorTokens = figma.getLocalPaintStyles()

  colorTokens.forEach((token) => {
    const matchingElement = colorElements.find(
      (element) => element.fillStyleId === token.id
    )
    if (!matchingElement) {
      return token.remove()
    }
  })

  // Add token if element does not have a matching token
  colorElements.forEach((element) => {
    const matchingToken = colorTokens.find(
      (token) => token.id === element.fillStyleId
    )

    if (!matchingToken) {
      const matchingName = colorTokens.filter(
        (token) =>
          token.name.replace(/\/\d+$/, "") ===
          replaceDashesWithSlashes(element.name.replace(/-\d+$/, ""))
      )

      const compileElementName =
        matchingName.length > 0
          ? `${element.name.replace(/-\d+$/, "")}-${matchingName.length + 1}`
          : element.name

      const createToken = figma.createPaintStyle()
      createToken.name = replaceDashesWithSlashes(compileElementName)
      createToken.paints = element.fills as Paint[]
      createToken.description = `token: ${compileElementName}`
      element.name = compileElementName
      element.fillStyleId = createToken.id
      return createToken
    }
  })
}
