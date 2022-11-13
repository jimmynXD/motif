/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * TODO: fix mainServices to pull types in correctly
 */

import mainServices from "@/meta/ui/mainService"
import { ColorTokenInterface, TypographyTokenInterface } from "@/meta/types"

export const getFigmaData = async () => {
  const colors: any = await mainServices.color.getColors()
  const textStyles: any = await mainServices.typography.getTypes()
  const colorResults: ColorTokenInterface[] = colors
  const textResults: TypographyTokenInterface[] = textStyles
  return { colorResults, textResults }
}
