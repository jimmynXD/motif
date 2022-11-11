import type { AppType } from "next/app"
import { trpc } from "@/meta/web"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

interface AppProps {
  session: Session
}

const App: AppType<AppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
