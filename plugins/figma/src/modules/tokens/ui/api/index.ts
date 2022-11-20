import { mainServices } from "@/meta/ui"

export const getFigmaData = async () => {
  const [colorResults, textResults, baseColorResults] = await Promise.all([
    mainServices.tokens.color.getColors(),
    mainServices.tokens.typography.getTypes(),
    mainServices.tokens.color.getBaseTextColor(),
  ])
  return { colorResults, textResults, baseColorResults }
}
