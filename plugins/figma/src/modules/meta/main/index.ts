import { default as metaMainService } from "./service"
import { mainService as tokenService } from "@/tokens/main"

export const linkedServices = {
  meta: metaMainService,
  tokens: tokenService,
}
export * from "./trpc"

export type LinkedMainServices = typeof linkedServices
