import { default as metaMainService } from "./service"
import { default as testMainService } from "./testService"
import { default as colorMainService } from "./colorService"
import { default as typographyMainService } from "./typographyService"

export const linkedServices = {
  meta: metaMainService,
  test: testMainService,
  color: colorMainService,
  typography: typographyMainService,
}

export type LinkedMainServices = typeof linkedServices
