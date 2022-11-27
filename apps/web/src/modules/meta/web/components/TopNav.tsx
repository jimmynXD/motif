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
    <nav>
      <div className="page-max-xl px-4 text-white flex">
        <div className={clsx("flex-1 flex items-center justify-center p-4")}>
          <span className="">
            <Link href="/" className="flex items-center justify-center">
              <span className="font-bold font-display text-lg lg:text-4xl text-indigo-100">
                motifXD
              </span>
              <span>
                <Image alt="motifxd" src={XDLogo} className="w-16 lg:w-20" />
              </span>
            </Link>
          </span>
        </div>
      </div>
    </nav>
  )
}
