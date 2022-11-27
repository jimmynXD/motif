import clsx from "clsx"
import Image from "next/image"
import { FC } from "react"
import DesignerPNG from "../assets/designer.png"
import DeveloperPNG from "../assets/developer.png"
import ServerPNG from "../assets/server.png"

export const HandoffAnimation: FC = () => {
  return (
    <section className={clsx("page-max-xl flex flex-col items-center pt-28")}>
      <div className="px-4 md:px-0 font-bold tracking-wider text-2xl md:text-3xl text-center">
        Seamless handoff between designers and devs
      </div>
      {/* designer widget */}
      <div
        className={clsx(
          "mt-8 w-full flex justify-center py-6 relative",
          "bg-gradient-to-r from-red-500 to-red-500",
          "after:px-2 after:absolute after:left-0 after:-translate-x-1/4 after:top-1/2 after:-translate-y-1/2 after:rotate-90",
          "after:h-8 after:content-['DESIGNER'] after:text-2xl after:font-bold",
          "md:from-red-500/0 md:via-red-500 md:to-red-500/0"
        )}
      >
        <span className={clsx("w-1/2 md:flex md:justify-center")}>
          <Image priority src={DesignerPNG} alt="Designer" />
        </span>
        <aside
          className={clsx(
            "absolute right-4 top-1/2 -translate-y-1/2 max-w-[80px] sm:max-w-[25%] text-sm tracking-wide max-h-[280]",
            "lg:text-base lg:text-white",
            "xl:max-w-[30%]"
          )}
        >
          <p className="hidden sm:block">
            Our Figma plugin lets designers{" "}
            <b className="underline underline-offset-2">
              create, update, and make styles available
            </b>{" "}
            for their devs to use in real time without leaving their Figma page.
            This is the handoff that thought about both sides XD
          </p>
          <p className="drop-shadow font-medium block sm:hidden">
            create, update, make available their figma styles
          </p>
        </aside>
      </div>

      {/* motif widget */}
      <div
        className={clsx(
          "w-full flex justify-center relative py-10",
          "after:px-6 after:absolute after:left-0 after:-translate-x-1/4 after:top-1/2 after:-translate-y-1/2 after:rotate-90",
          "after:h-8 after:content-['motifXD'] after:text-2xl after:font-bold"
        )}
      >
        <span className="w-[130px] z-10">
          <Image src={ServerPNG} alt="Server" />
        </span>
        <aside
          className={clsx(
            "absolute right-4 top-1/2 -translate-y-1/2 max-w-[80px] sm:max-w-[25%] text-sm tracking-wide max-h-[280]",
            "lg:text-base lg:text-white",
            "xl:max-w-[30%]"
          )}
        >
          <p className="hidden sm:block">
            We{" "}
            <b className="underline underline-offset-2">
              translate those figma styles into code
            </b>{" "}
            that devs can read and use in their apps.
          </p>
          <p className="drop-shadow font-medium block sm:hidden">
            translate those figma styles into code
          </p>
        </aside>

        <div className="animate-slide-y -translate-y-1/2 absolute flex flex-col left-1/2 -translate-x-1/2 z-[1]">
          <div className="animate-fade-in-first">
            <span
              className={clsx(
                "material-symbols-rounded text-2xl",
                "md:text-4xl"
              )}
            >
              palette
            </span>
          </div>

          <div className="animate-fade-in-last">
            <span
              className={clsx(
                "material-symbols-rounded text-2xl",
                "md:text-4xl"
              )}
            >
              rocket_launch
            </span>
          </div>
        </div>
      </div>

      {/* developer widget */}
      <div
        className={clsx(
          "w-full flex justify-center py-6 relative",
          "bg-gradient-to-r from-yellow-500 to-yellow-500",
          "after:absolute after:left-0 after:-translate-x-1/4 after:top-1/2 after:-translate-y-1/2 after:rotate-90",
          "after:h-8 after:content-['DEVELOPER'] after:text-2xl after:font-bold",
          "md:from-yellow-500/0 md:via-yellow-500 md:to-yellow-500/0"
        )}
      >
        <span className={clsx("w-1/2 md:flex md:justify-center")}>
          <Image src={DeveloperPNG} alt="Developer" />
        </span>
        <aside
          className={clsx(
            "absolute right-4 top-1/2 -translate-y-1/2 max-w-[80px] sm:max-w-[25%] text-sm tracking-wide max-h-[280]",
            "lg:text-base lg:text-white",
            "xl:max-w-[30%]"
          )}
        >
          <p className="hidden sm:block">
            Our API gives{" "}
            <b className="underline underline-offset-2">
              easy access for devs to fetch and use
            </b>{" "}
            those styles in their app. Along with the CLI tool we have in the
            works, they will be able to{" "}
            <b className="underline underline-offset-2">fetch style changes</b>{" "}
            the moment the designer updates them.
          </p>
          <p className="drop-shadow font-medium block sm:hidden">
            easy access for devs to fetch and use those styles
          </p>
        </aside>
      </div>
    </section>
  )
}
