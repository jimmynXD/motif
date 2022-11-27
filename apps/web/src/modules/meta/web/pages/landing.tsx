import { NextPage } from "next"
import {
  CallToActionBottom,
  Footer,
  HandoffAnimation,
  HeroBanner,
  PageLayout,
  TopNav,
  VideoDemo,
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
      <main className="pt-16 pb-8 text-white">
        <HeroBanner />
        <VideoDemo />
        <HandoffAnimation />
        <CallToActionBottom />
      </main>
    </PageLayout>
  )
}
