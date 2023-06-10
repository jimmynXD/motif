import clsx from "clsx"
import Image from "next/image"
import { FC } from "react"
import LandingImage from "../assets/landing-individual.png"
import Screenshot from "../assets/screenshot.png"
import { EmailSignUp } from "./EmailSignUp"
export const CallToActionBottom: FC = () => {
  return (
    <>
      <section
        className={clsx("pt-28 flex justify-between items-center", "flex-col")}
      >
        <div className="px-4 md:px-0 font-bold tracking-wider text-2xl md:text-3xl text-center">
          Build with our Figma Plugin
        </div>
        <div className={clsx("flex flex-col w-full items-center")}>
          <aside className={clsx("page-max-xl flex flex-col lg:px-20 pt-8")}>
            <span>
              <Image src={LandingImage} alt="demo-image" />
            </span>
          </aside>
        </div>
      </section>
      <section
        className={clsx("pt-28 flex justify-between items-center", "flex-col")}
      >
        <div className="px-4 md:px-0 font-bold tracking-wider text-2xl md:text-3xl text-center">
          View with our Design Dashboard
        </div>
        <div className={clsx("flex flex-col w-full items-center")}>
          <aside
            className={clsx(
              "page-max-xl flex flex-col pt-8 lg:px-20",
              "md:flex-row md:space-y-0 md:space-x-8"
            )}
          >
            <span>
              <Image src={Screenshot} alt="screenshot-image" />
            </span>
          </aside>
          <div className={clsx("pt-28 flex-1 flex justify-center w-full")}>
            <EmailSignUp full inputId="signUpEmailBottom" />
          </div>
        </div>
      </section>
    </>
  )
}
