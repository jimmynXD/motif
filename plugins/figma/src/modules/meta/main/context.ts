import { type inferAsyncReturnType } from "@trpc/server"

export const createContext = async () => {
  return {
    figma,
  }
}
export type Context = inferAsyncReturnType<typeof createContext>
