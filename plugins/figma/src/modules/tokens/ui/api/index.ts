import { mainServices } from "@/meta/ui"

export const getFigmaData = async () => {
  const [colorResults, textResults] = await Promise.all([
    mainServices.tokens.color.getColors(),
    mainServices.tokens.typography.getTypes(),
  ])
  return { colorResults, textResults }
}
