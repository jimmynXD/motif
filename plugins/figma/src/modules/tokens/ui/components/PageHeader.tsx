import clsx from "clsx"
import { FC } from "react"
import { NavLink } from "react-router-dom"

export interface PageHeaderProps {
  newTokenLink: string
  title: string
}
export const PageHeader: FC<PageHeaderProps> = ({ newTokenLink, title }) => {
  return (
    <header
      className={clsx(
        "px-4 pt-4 pb-2 bg-white dark:bg-dark-bg",
        "border-b-[0.5px] border-b-[#DCDCDC] dark:border-b-white/20"
      )}
    >
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-bold dark:text-white">{title}</h1>
        <NavLink
          to={newTokenLink}
          className="rounded-full bg-xd-primary-purple-700 w-8 h-8 flex justify-center items-center"
        >
          <span className="material-symbols-rounded text-white">add</span>
        </NavLink>
      </div>
    </header>
  )
}
