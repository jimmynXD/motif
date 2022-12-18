import { createTRPCReact } from "@trpc/react-query"
import { type AppRouter } from "../main/fauxRouter"

export const trpc = createTRPCReact<
  AppRouter,
  unknown,
  "ExperimentalSuspense"
>()
