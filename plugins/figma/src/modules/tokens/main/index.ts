import { createMainService } from "@/comlinkFigma"
import colorService from "./colorService"
import typographyService from "./typographyService"
import templateService from "./generateService"

export const service = {
  color: colorService,
  typography: typographyService,
  template: templateService,
}

export const mainService = createMainService(service)
