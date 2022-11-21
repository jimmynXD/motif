import { mainServices } from "@/meta/ui"

export const getFigmaData = async () => {
  const [colorResults, textResults, rootTextColorResults] = await Promise.all([
    mainServices.tokens.color.getColors(),
    mainServices.tokens.typography.getTypes(),
    mainServices.tokens.color.getRootTextColor(),
  ])
  return { colorResults, textResults, rootTextColorResults }
}
