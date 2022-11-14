import { createTRPCReact } from "@trpc/react-query"
import { type AppRouter } from "web/api"

export const trpc = createTRPCReact<AppRouter>()
