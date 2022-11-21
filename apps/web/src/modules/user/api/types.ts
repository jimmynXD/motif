import { Context } from "@/meta/api"
import { NextauthUsers } from "@/db/api"
import { UserWithRoles } from "./middlewares"

export interface UserContextBase<U extends NextauthUsers = NextauthUsers>
  extends Context {
  user: U
}

export type UserContext = UserContextBase<UserWithRoles>
