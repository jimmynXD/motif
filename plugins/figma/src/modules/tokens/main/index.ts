import { createMainService } from "@/comlinkFigma"
import colorService from "./colorService"
import typographyService from "./typographyService"
import templateService from "./generateService"
import removeService from "./removeService"

export const service = {
  color: colorService,
  typography: typographyService,
  template: templateService,
  remove: removeService,
}

export const mainService = createMainService(service)
