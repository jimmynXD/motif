import { type NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { XataAdapter } from "@next-auth/xata-adapter"
import { getXataClient } from "@/db/api"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ID: string
      GOOGLE_SECRET: string
    }
  }
}

export const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
]

const client = getXataClient()

export const options: NextAuthOptions = {
  adapter: XataAdapter(client),
  providers,
}

export default options
