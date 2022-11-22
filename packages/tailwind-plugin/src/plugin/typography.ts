import plugin from "tailwindcss/plugin"
import motifData from "../motif-data.json"

export const TypographyClasses = plugin(function ({ addComponents }) {
  const variants = Object.keys(motifData.typography.variant)

  type keys = keyof typeof motifData.typography.variant
  variants.map((key) => {
    const k = key as keys
    motifData.typography.variant[k].map((item) => {
      const addPx = (value: number) => {
        return `${value}px`
      }
      return addComponents({
        [`.${k}-${item.name}`]: {
          fontSize: addPx(item.fontSize),
          lineHeight: addPx(item.lineHeight),
          fontWeight: item.fontWeight,
        },
      })
    })
  })
})
