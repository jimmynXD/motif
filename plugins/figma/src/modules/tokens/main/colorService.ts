import { createMainService } from "@/comlinkFigma"
import { ColorToken } from "../shared/types"

// multiple rgb values by 255
const rgbValue = (value: number) => Math.round(value * 255)

// convert rgb to hex
const rgbToHex = (r: number, g: number, b: number) => {
  const bin = (r << 16) | (g << 8) | b
  return (function (h) {
    return new Array(7 - h.length).join("0") + h
  })(bin.toString(16).toUpperCase())
}

export const getColors = () => {
  // get all colors from figma
  const colors = figma.getLocalPaintStyles()

  const isColor = (val?: ColorToken): val is ColorToken => !!val

  const colorValues = colors
    .map((style) => {
      const name = style.name.toLowerCase().replace(/\//g, ".")
      const rgbColor = style.paints[0].type === "SOLID" && style.paints[0].color

      if (rgbColor) {
        const rgb = {
          r: rgbValue(rgbColor.r),
          g: rgbValue(rgbColor.g),
          b: rgbValue(rgbColor.b),
        }

        const color = {
          name,
          hex: `#${rgbToHex(rgb.r, rgb.g, rgb.b)}`,
          rgb,
        }

        return color
      }
    })
    .filter(isColor)

  return colorValues
}

export const service = {
  getColors,
}

export default createMainService(service)
