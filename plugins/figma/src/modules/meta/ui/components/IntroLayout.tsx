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
        <div className="relative w-full flex flex-col items-center justify-center">
          <div
            className={clsx(
              "absolute -top-12 -translate-y-full space-y-1",
              "capitalize text-base font-semibold text-center"
            )}
          >
            <div>Design Systems</div>
            <div>For every team and every project</div>
          </div>
          {children}
          {subMessage}
        </div>
      )}
    </main>
  )
}
