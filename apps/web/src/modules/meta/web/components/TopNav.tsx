import { FC, ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import XDLogo from "../assets/xd-logo-dark.png"
import clsx from "clsx"
import LogoSrc from "../assets/xd-logo.png"
interface TopNavInterface {
  children?: ReactNode
  pageLevel?: boolean
}

export const TopNav: FC<TopNavInterface> = ({ children, pageLevel }) => {
  if (pageLevel) {
    return (
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 h-16",
          "bg-white dark:bg-black border-b border-b-gray-300"
        )}
      >
        <div className={clsx("flex p-2 h-full items-center")}>
          <div className={clsx("min-w-[min-content]", "flex pr-8")}>
            <Link href="/" className="flex items-center">
              <span className="text-normal font-display tracking-wide font-semibold">
                motifXD
              </span>
              <span className="w-10 h-10 aspect-square">
                <Image src={LogoSrc} alt="motifXD" />
              </span>
            </Link>
          </div>
          <div className={clsx("flex-1")}>{children}</div>
          <div>
            <div
              className={clsx(
                "h-8 w-8 flex justify-center items-center rounded-full",
                "bg-purple-500",
                "text-sm font-semibold text-white"
              )}
            >
              JN
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <nav className="">
      <div className="relative page-max-xl p-4 text-white flex flex-col space-y-4 md:space-y-0 md:flex-row">
        <div
          className={clsx(
            "flex items-center flex-1 justify-center md:justify-start"
          )}
        >
          <span className="">
            <Link href="/" className="flex items-center justify-center">
              <span className="font-bold font-display text-xl lg:text-2xl text-red-50">
                motifXD
              </span>
              <span className="">
                <Image alt="motifxd" src={XDLogo} className="w-16 lg:w-20" />
              </span>
            </Link>
          </span>
        </div>
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2">
          <span className="font-semibold tracking-wider font-display text-lg lg:text-3xl">
            DesignOps starts here
          </span>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <Link
            href="https://www.figma.com/community/plugin/1176582292266618363"
            target={"_blank"}
            className={clsx("button button-red")}
          >
            Figma Plugin Now Available
          </Link>
        </div>
      </div>
    </nav>
  )
}
