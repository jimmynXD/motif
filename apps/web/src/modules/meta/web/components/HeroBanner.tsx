import clsx from "clsx"
import Image from "next/image"
import { FC } from "react"

import { EmailSignUp } from "@/meta/web"
import LandingImage from "../assets/landing-full.png"

export const HeroBanner: FC = () => {
  return (
    <section
      className={clsx("page-max-xl flex flex-col items-center", "lg:flex-row")}
    >
      <div
        className={clsx(
          "flex flex-col md:items-center w-full",
          "lg:w-[unset] lg:pr-12"
        )}
      >
        <div className={clsx("px-4 md:max-w-lg space-y-8 text-center")}>
          <div
            className={clsx("font-bold tracking-wider text-3xl", "md:text-3xl")}
          >
            Design System Dashboard
          </div>
          <p className={clsx("text-xl font-medium text-slate-200 text-center")}>
            We are making design systems easier by providing a dashboard to view
            and manage your design tokens.
          </p>
        </div>
        <EmailSignUp inputId="signUpEmailTop" />
      </div>
      <aside className={clsx("pt-12", "lg:pt-0 lg:pr-4")}>
        <div className="max-w-2xl rounded">
          <Image priority src={LandingImage} alt="demo-image" />
        </div>
      </aside>
    </section>
  )
}
