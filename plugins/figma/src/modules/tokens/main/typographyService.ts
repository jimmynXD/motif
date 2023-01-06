import { createMainService } from "@/comlinkFigma"
import { replaceSlashesAndDashes } from "./utils"

export const getTypes = () => {
  // get all text styles from figma
  const textStyles = figma.getLocalTextStyles()

  const typographyValues = textStyles.map((style) => {
    const id = style.id
    const name = replaceSlashesAndDashes(style.name)
    const lineHeightRelative =
      style.lineHeight.unit === "PIXELS"
        ? Math.round((style.lineHeight.value / style.fontSize) * 100) / 100
        : undefined

    const lineHeightAbsolute =
      style.lineHeight.unit === "PIXELS"
        ? `${style.lineHeight.value}px`
        : undefined

    const typography = {
      id,
      name,
      font: {
        weight: style.fontName.style.toLowerCase(),
        family: style.fontName.family,
        size: style.fontSize,
      },
      line: {
        height: lineHeightAbsolute,
        heightRelative: lineHeightRelative,
      },
      letterSpacing: style.letterSpacing.value,
    }

    return typography
  })

  return typographyValues
}

export const service = {
  getTypes,
}

export default createMainService(service)
