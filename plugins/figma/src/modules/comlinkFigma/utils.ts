import { expose, proxy, wrap } from "comlink";
import { mainEndpoint, type MainEndpointOptions } from "./mainEndpoint";
import { uiEndpoint } from "./uiEndpoint";

type Func = (...args: Array<any>) => unknown;

export interface Service {
  [Key: string]: Func;
}

export const createMainService = <T extends Service>(service: T) => {
  return proxy(service);
};

export interface Services {
  [k: string]: ReturnType<typeof createMainService>;
}

export const exposeMainServices = <T extends Services>(services: T) => {
  expose(services, uiEndpoint());
};

export const loadMainServices = <T>(opts?: MainEndpointOptions) =>
  wrap<T>(mainEndpoint(opts));
