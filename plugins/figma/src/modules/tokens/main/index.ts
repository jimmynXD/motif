import { createMainService } from "@/comlinkFigma"
import colorService from "./colorService"
import typographyService from "./typographyService"
import templateService from "./generateService"
import deleteService from "./deleteService"

export const service = {
  color: colorService,
  typography: typographyService,
  template: templateService,
  delete: deleteService,
}

export const mainService = createMainService(service)
