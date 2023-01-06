import { FC, ReactNode, useMemo } from "react"
import clsx from "clsx"
import { NavLink, useLocation } from "react-router-dom"

export interface TopNavProps {
  children: ReactNode
  noAction?: boolean
}
export const TopNav: FC<TopNavProps> = ({ children, noAction = false }) => {
  const location = useLocation()

  const nowActive = useMemo(() => {
    return location.pathname === "/" || location.pathname === "/text"
  }, [location.pathname])

  const pageName = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return "Color Token"
      case "/text":
        return "Text Token"
      case "/instruction":
        return "Instructions"
      default:
        return "motifXD"
    }
  }, [location.pathname])

  const newLink = useMemo(() => {
    if (location.pathname === "/") return "/color/new"
    if (location.pathname === "/text") return "/text/new"
    return "/"
  }, [location.pathname])

  const buttonCls = (isActive: boolean) =>
    clsx(
      "flex-1 flex justify-center items-center z-10",
      "rounded-lg px-1 py-[6px]",
      "text-[13px] leading-none",
      {
        "shadow-sm bg-white dark:bg-[#636366] font-semibold text-xd-primary-purple-700 dark:text-white":
          isActive,
      }
    )

  return (
    <div className="mb-20">
      <header
        className={clsx(
          "sticky top-0 z-10",
          "shadow-sm bg-white dark:bg-dark-bg"
        )}
      >
        <nav className="py-2 px-4">
          <div
            className={clsx(
              "relative flex",
              "p-[2px] rounded-[10px] bg-[#767680]/[0.12] dark:bg-[#2D2D2D] z-[1]",
              "after:absolute after:-translate-y-1/2 after:top-1/2 after:left-1/3 after:w-[1px] after:h-3 after:rounded-full after:bg-[#8E8E93] after:z-0",
              "before:absolute before:-translate-y-1/2 before:top-1/2 before:right-1/3 before:w-[1px] before:h-3 before:rounded-full before:bg-[#8E8E93] before:z-0"
            )}
          >
            <NavLink to={"/"} className={buttonCls(nowActive)}>
              <span className="dark:text-white">Tokens</span>
            </NavLink>
            <button
              disabled
              className={clsx(
                "flex-1 flex justify-center items-center z-10",
                "rounded-lg px-1 py-[6px]",
                "text-[13px] leading-none",
                "disabled:text-black/20 dark:disabled:text-white/20"
              )}
            >
              <span>Deploy</span>
            </button>

            <NavLink
              to={"/instruction"}
              className={({ isActive }) => buttonCls(isActive)}
            >
              <span className="dark:text-white">Instructions</span>
            </NavLink>
          </div>
        </nav>
        <div
          className={clsx(
            "px-4 pt-4 pb-2 bg-white dark:bg-dark-bg",
            "border-b-[0.5px] border-b-[#DCDCDC] dark:border-b-white/20"
          )}
        >
          <div className="flex justify-between items-end">
            <h1 className="text-3xl font-bold dark:text-white">{pageName}</h1>
            {!noAction && (
              <NavLink
                to={newLink}
                className="rounded-full bg-xd-primary-purple-700 w-8 h-8 flex justify-center items-center"
              >
                <span className="material-symbols-rounded text-white">add</span>
              </NavLink>
            )}
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}

export interface TopActionNavProps {
  children: ReactNode
  backLabel: string
  onClickBack: () => void
  onClickSave: () => void
  title: string
}
export const TopActionNav: FC<TopActionNavProps> = ({
  backLabel,
  children,
  onClickBack,
  onClickSave,
  title,
}) => {
  return (
    <div className="mb-8">
      <header
        className={clsx(
          "sticky top-0 z-10",
          "shadow-sm bg-white dark:bg-dark-bg"
        )}
      >
        <nav className="h-[45px] pl-3 pr-4 flex items-center justify-between w-full">
          <button
            onClick={onClickBack}
            className={clsx(
              "flex items-center text-[#007AFF] dark:text-[#0B81F8]"
            )}
          >
            <span className="material-symbols-rounded text-base">
              arrow_back_ios
            </span>
            <span>{backLabel}</span>
          </button>
          <button
            onClick={onClickSave}
            className="material-symbols-rounded text-xd-primary-purple-700 dark:text-[#D0B4FF]"
          >
            save
          </button>
        </nav>
        <div
          className={clsx(
            "px-4 pt-4 pb-2 bg-white dark:bg-dark-bg",
            "border-b-[0.5px] border-b-[#DCDCDC] dark:border-b-white/20"
          )}
        >
          <div>
            <h1 className="text-3xl font-bold dark:text-white">{title}</h1>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
