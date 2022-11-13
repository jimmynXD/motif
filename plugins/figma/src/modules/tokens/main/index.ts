import { createMainService } from "@/comlinkFigma"
import colorService from "./colorService"
import typographyService from "./typographyService"

export const service = {
  color: colorService,
  typography: typographyService,
}

export const mainService = createMainService(service)
