import { createMainService } from "@/comlinkFigma"
import { replaceSlashesAndDashes } from "./utils"

export const getTypes = () => {
  // get all text styles from figma
  const textStyles = figma.getLocalTextStyles()

  const typographyValues = textStyles.map((style) => {
    const id = style.id
    const name = replaceSlashesAndDashes(style.name)

    const lineHeightAbsolute =
      style.lineHeight.unit === "PIXELS" ? style.lineHeight.value : undefined

    const typography = {
      id,
      name,
      fontSize: style.fontSize,
      font: {
        family: style.fontName.family,
        style: style.fontName.style.toLowerCase(),
      },
      lineHeight: lineHeightAbsolute,
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
