import { NextPage } from "next"
import {
  Footer,
  HandoffAnimation,
  HeroBanner,
  PageLayout,
  TopNav,
} from "../components"
export const LandingPage: NextPage = () => {
  return (
    <PageLayout
      primary
      pageTitle="motifXD Figma Plugin"
      topNav={<TopNav />}
      footer={<Footer />}
      cls={"bg-black/90"}
    >
      <main className="page-max-xl pt-16 pb-8 text-white">
        <HeroBanner />
        <HandoffAnimation />
      </main>
    </PageLayout>
  )
}
