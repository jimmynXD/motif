import { type Services } from "@/comlinkFigma/utils";
import { default as metaMainService } from "./service";
import { default as testMainService } from "./testService";

export const linkedServices: Services = {
  meta: metaMainService,
  test: testMainService,
};

export type LinkedMainServices = typeof linkedServices;
