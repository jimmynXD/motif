import { expose, proxy, wrap } from "comlink"
import { mainEndpoint, type MainEndpointOptions } from "./mainEndpoint"
import { uiEndpoint } from "./uiEndpoint"

export const createMainService = proxy

export const exposeMainServices = (services: Record<string, unknown>) => {
  expose(services, uiEndpoint())
}

export const loadMainServices = <T>(opts?: MainEndpointOptions) =>
  wrap<T>(mainEndpoint(opts))
