import { FC, ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import LogoDark from "../assets/xd-logo-dark.png"
import LogoLight from "../assets/xd-logo.png"
import clsx from "clsx"
import { Button } from "ui"
import { signIn, signOut, useSession } from "next-auth/react"
import { UserMenu } from "./UserMenu"
import { useTheme } from "next-themes"
interface TopNavInterface {
  children?: ReactNode
  className?: string
  pageLevel?: boolean
}

export const TopNav: FC<TopNavInterface> = ({
  children,
  className,
  pageLevel,
}) => {
  const { data: session } = useSession()
  const theme = useTheme()

  if (pageLevel) {
    return (
      <header
        className={clsx(
          className,
          "h-16 bg-white/50 backdrop-blur-md z-50",
          "dark:bg-black/90"
        )}
      >
        <div className={clsx("flex items-end justify-between", "py-2 px-8")}>
          <div className={clsx("min-w-[min-content]", "flex pr-8")}>
            <Link href="/app/workspace" className="flex items-center">
              <span className="hidden md:block text-normal font-display tracking-wide font-semibold dark:text-white">
                motifXD
              </span>
              <span className="w-10 h-10 aspect-square">
                <Image
                  src={theme.systemTheme === "dark" ? LogoDark : LogoLight}
                  alt="motifXD"
                />
              </span>
            </Link>
          </div>
          <div className={clsx("flex-1")}>{children}</div>
          <div>
            <UserMenu />
          </div>
        </div>
      </header>
    )
  }

  return (
    <nav
      className={clsx(
        className,
        "sticky top-0 z-50 h-16 bg-black/50 backdrop-blur-md",
        "shadow-[inset_0_-1px_0_0_rgb(255_255_255_/_0.1)]",
        "dark:shadow-[inset_0_-1px_0_0_rgb(255_255_255_/_0.1)]"
      )}
    >
      <div
        className={clsx(
          "flex flex-col space-y-2 md:space-y-0 md:flex-row page-max-xl py-2 px-8 items-center justify-between"
        )}
      >
        <span className={clsx("min-w-[min-content]", "text-white")}>
          <Link href="/" className="flex items-center">
            <span className="text-normal font-display tracking-wide font-semibold">
              motifXD
            </span>
            <span className="w-10 h-10 aspect-square">
              <Image src={LogoDark} alt="motifXD" />
            </span>
          </Link>
        </span>
        <div className="flex space-x-2 items-center">
          {/* <Button
            className={clsx("local-link")}
            onPress={() => {
              session
                ? signOut()
                : signIn("google", {
                    redirect: true,
                    // TODO: replace /w url from env
                    callbackUrl: "http://localhost:3000/app/workspace",
                  })
            }}
          >
            {session ? "Sign out" : "Sign in"}
          </Button> */}
          {/* {session ? (
            <Link
              href="/app/workspace"
              className={clsx(
                "button button-outline button-sm rounded-full",
                "bg-transparent text-gray-300 hover:text-black active:text-black"
              )}
            >
              Go to Workspace
            </Link>
          ) : (
            <Link
              href="https://www.figma.com/community/plugin/1176582292266618363"
              target={"_blank"}
              className={clsx(
                "button button-outline button-sm rounded-full",
                "bg-transparent text-gray-300 hover:text-black active:text-black"
              )}
            >
              Try out the Figma Plugin
            </Link>
          )} */}
          <Link
            href="https://www.figma.com/community/plugin/1176582292266618363"
            target={"_blank"}
            className={clsx(
              "button button-outline button-sm rounded-full",
              "bg-transparent text-gray-300 hover:text-black active:text-black"
            )}
          >
            Try out the Figma Plugin
          </Link>
        </div>
      </div>
    </nav>
  )
}
