import { publicProcedure } from "@/meta/api"
import {
  enhanceWithUserWorkspaceRoles,
  hasWorkspaceAccess,
  isAuthenticated,
} from "./middlewares"

export const userProcedure = publicProcedure.use(isAuthenticated)
export const workspaceProcedure = userProcedure
  .use(enhanceWithUserWorkspaceRoles)
  .use(hasWorkspaceAccess)
