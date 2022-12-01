import clsx from "clsx"
import { NextPage } from "next"
import Link from "next/link"
import {
  CallToActionBottom,
  Footer,
  HandoffAnimation,
  HeroBanner,
  PageLayout,
  TopNav,
} from "../components"

export const LandingPage: NextPage = () => {
  return (
    <PageLayout
      pageTitle="motifXD DesignOps"
      topNav={<TopNav />}
      footer={<Footer />}
      cls={"bg-black/90"}
    >
      <main className="pt-16 pb-8 text-white">
        <HeroBanner />
        <HandoffAnimation />
        <CallToActionBottom />
        <section
          className={clsx(
            "pt-28 flex justify-between items-center",
            "flex-col"
          )}
        >
          <div className="px-4 md:px-0 font-bold tracking-wider text-2xl md:text-3xl text-center underline underline-offset-4">
            Roadmap
          </div>
          <ul className="text-lg space-y-2 pt-4">
            <li className="flex space-x-2 items-center">
              <span className="material-symbols-outlined text-purple-300">
                done_outline
              </span>
              <Link
                href="https://www.figma.com/community/plugin/1176582292266618363"
                target={"_blank"}
                className={clsx("text-purple-300 font-bold")}
              >
                Figma Plugin
              </Link>
              <span className="italic">[November 28]</span>
            </li>
            <li className="flex space-x-2 items-center">
              <span className="material-symbols-outlined">pending</span>
              <span>API Generator</span>
            </li>
            <li className="flex space-x-2 items-center">
              <span className="material-symbols-outlined">pending</span>
              <span>Design Dashboard</span>
            </li>
            <li className="flex space-x-2 items-center">
              <span className="material-symbols-outlined">pending</span>
              <span>Developer CLI Tool</span>
            </li>
            <li className="flex space-x-2 items-center">
              <span className="material-symbols-outlined">pending</span>
              <span>Tailwind Plugin</span>
            </li>
          </ul>
        </section>
      </main>
    </PageLayout>
  )
}
