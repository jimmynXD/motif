import clsx from "clsx"
import Image from "next/image"
import { FC } from "react"

import { EmailSignUp } from "@/meta/web"
import DemoAnimation from "../assets/demo-colors-animation.gif"

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
        <div className={clsx("px-4 md:max-w-lg space-y-8 text-left")}>
          <div
            className={clsx(
              "font-bold tracking-wider text-3xl text-center",
              "md:text-3xl"
            )}
          >
            Your design system, your way
          </div>
          <p className={clsx("text-xl font-medium text-slate-200 text-center")}>
            Handoffs just got easier. Manage designs in Figma and we&apos;ll get
            them into your codebase instantly!
          </p>
        </div>
        <EmailSignUp />
      </div>
      <aside className={clsx("pt-12", "lg:pt-0 lg:pr-4")}>
        <div className="max-w-2xl rounded">
          <Image src={DemoAnimation} alt="demo-image" />
        </div>
      </aside>
    </section>
  )
}
