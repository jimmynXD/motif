import type { AppType } from "next/app"
import { trpc } from "@/meta/web"

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(App)
