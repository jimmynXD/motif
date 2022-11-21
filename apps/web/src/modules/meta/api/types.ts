import { type Context } from "./utils"

export interface ServiceHandlerParams<T, C> {
  ctx: C
  input: T
}

export type ServiceHandler<A, R, C = Context> = (
  args: ServiceHandlerParams<A, C>
) => R | Promise<R>
