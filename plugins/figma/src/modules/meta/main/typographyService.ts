import { createMainService } from "@/comlinkFigma"
import { TypographyTokenInterface } from "../types"

export const getTypes = () => {
  // get all text styles from figma
  const textStyles = figma.getLocalTextStyles()

  const typographyValues = textStyles.map((style) => {
    const typographyName = style.name.toLowerCase().replace(/\//g, ".")
    const lineHeightRelative =
      style.lineHeight.unit === "PIXELS"
        ? Math.round((style.lineHeight.value / style.fontSize) * 100) / 100
        : undefined

    const lineHeightAbsolute =
      style.lineHeight.unit === "PIXELS"
        ? `${style.lineHeight.value}px`
        : undefined

    const typography: TypographyTokenInterface = {
      token: typographyName,
      fontFamily: style.fontName.family,
      fontWeight: style.fontName.style.toLowerCase(),
      fontSize: style.fontSize,
      lineHeight: lineHeightAbsolute,
      lineHeightRelative,
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
