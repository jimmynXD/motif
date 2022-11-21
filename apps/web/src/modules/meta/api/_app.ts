import { initTRPC } from "@trpc/server"
import { Context } from "./utils"

export const t = initTRPC.context<Context>().create()

export const router = t.router
export const middleware = t.middleware
export const mergeRouters = t.mergeRouters
/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure

// workspace member procedure
// workspace admin procedure
