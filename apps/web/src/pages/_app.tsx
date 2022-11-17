import "../styles/global.css"
import type { AppType } from "next/app"
import { trpc } from "@/meta/web"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"

interface AppProps {
  session: Session
}

const App: AppType<AppProps> = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
