import motifData from "./motif-data.json"
import type { Config } from "tailwindcss"
import { TypographyClasses } from "./plugin/typography"

type PresetConfig = Omit<Config, "content">
const config: PresetConfig = {
  theme: {
    fontFamily: {
      sans: [motifData.typography.fontFamily, "sans-serif"],
    },
    fontSize: {
      base: [
        motifData.typography.fontSize,
        { lineHeight: motifData.typography.lineHeight },
      ],
    },
    fontWeight: {
      normal: motifData.typography.fontWeight,
    },
    extend: {
      colors: {
        ...motifData.colorTokens,
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins: [TypographyClasses],
}

module.exports = config
