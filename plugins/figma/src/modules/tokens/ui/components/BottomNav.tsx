import clsx from "clsx"
import { FC } from "react"
import { NavLink } from "react-router-dom"

export type BottomNavItem = {
  name: string
  icon: string
}
export interface BottomNavProps {
  active?: boolean
  //   items: BottomNavItem[]
}
export const BottomNav: FC<BottomNavProps> = ({ active }) => {
  const NavArray = [
    {
      name: "Color",
      path: "/",
      icon: "format_color_fill",
    },
    {
      name: "Text",
      path: "/text",
      icon: "text_fields",
    },
  ]
  return (
    <nav
      className={clsx(
        "fixed bottom-0 left-0 right-0",
        "bg-[#F9F9F9] border-t-[0.5px] border-t-black/30 px-8 pb-1 pt-[6px]",
        "dark:bg-dark-bg dark:border-t-white/20"
      )}
    >
      <div className={clsx("flex justify-between items-center")}>
        {NavArray.map((nav) => (
          <NavLink
            key={nav.path}
            to={nav.path}
            className={clsx(
              "flex flex-col items-center justify-center",
              "space-y-1",
              "transition-all cursor-pointer",
              "text-gray-500 dark:text-[#C4C4C4]",
              "hover:text-xd-primary-purple-700 dark:hover:text-[#D0B4FF] focus:text-xd-primary-purple-800 active:text-xd-primary-purple-800"
            )}
          >
            {({ isActive }) => (
              <>
                <span
                  className={clsx("material-symbols-rounded p-1 rounded-full", {
                    "bg-xd-primary-purple-700 text-white": isActive,
                  })}
                >
                  {nav.icon}
                </span>
                <span
                  className={clsx("text-xs font-medium", {
                    "text-xd-primary-purple-700 dark:text-[#D0B4FF]": isActive,
                  })}
                >
                  {nav.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
