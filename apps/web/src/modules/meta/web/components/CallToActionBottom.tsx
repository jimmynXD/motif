import clsx from "clsx"
import Image from "next/image"
import { FC } from "react"
import TokensPNG from "../assets/tokens.png"
import DeployPNG from "../assets/deploy.png"
import { EmailSignUp } from "./EmailSignUp"
export const CallToActionBottom: FC = () => {
  return (
    <section
      className={clsx("pt-28 flex justify-between items-center", "flex-col")}
    >
      <div className="px-4 md:px-0 font-bold tracking-wider text-2xl md:text-3xl text-center">
        Manage Design System with our Figma Plugin
      </div>
      <div className={clsx("flex flex-col w-full items-center")}>
        <aside
          className={clsx(
            "page-max-xl flex flex-col space-y-4 pt-8",
            "md:flex-row md:space-y-0 md:space-x-8"
          )}
        >
          <span>
            <Image src={TokensPNG} alt="demo-image" />
          </span>
          <span>
            <Image src={DeployPNG} alt="demo-image" />
          </span>
        </aside>
        <div className={clsx("pt-28 flex-1 flex justify-center w-full")}>
          <EmailSignUp full inputId="signUpEmailBottom" />
        </div>
      </div>
    </section>
  )
}
