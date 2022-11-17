import { FC } from "react"
import Link from "next/link"
import Image from "next/image"
import XDLogo from "../assets/xd-logo-dark.png"
import clsx from "clsx"

export const TopNav: FC = () => {
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
