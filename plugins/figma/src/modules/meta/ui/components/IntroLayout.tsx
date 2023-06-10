import clsx from "clsx"
import { FC, ReactNode } from "react"

export interface IntroLayoutProps {
  children: ReactNode
  logoOnly?: boolean
  subMessage?: ReactNode
}

export const IntroLayout: FC<IntroLayoutProps> = ({
  children,
  logoOnly,
  subMessage,
}) => {
  return (
    <main className="fixed inset-0 flex flex-col justify-center items-center">
      {logoOnly ? (
        <div className="relative w-full flex flex-col items-center justify-center">
          <div className="absolute -top-12 -translate-y-full">
            <aside className="flex items-center">
              <div className="font-semibold text-lg">motifXD</div>
              <span className={clsx("w-16 h-16")}>
                <img src={require("../assets/logo.svg")} />
              </span>
            </aside>
          </div>
          {children}
        </div>
      ) : (
        <div className="h-full flex flex-col items-center pt-20">
          {children}
          {subMessage}
          <div
            className={clsx(
              "pt-8 capitalize text-base font-semibold text-center"
            )}
          >
            Authenticating...
          </div>
        </div>
      )}
    </main>
  )
}
