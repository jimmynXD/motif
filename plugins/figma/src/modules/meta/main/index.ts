import { type Services } from "@/comlinkFigma/utils"
import { default as metaMainService } from "./service"
import { default as colorService } from "./colorService"
import { default as typographyService } from "./typographyService"

export const linkedServices: Services = {
  meta: metaMainService,
  color: colorService,
  typography: typographyService,
}

export type LinkedMainServices = typeof linkedServices
