import { BottomNavContainer } from "@/meta/ui"
import clsx from "clsx"
import { FC } from "react"
import { NavLink } from "react-router-dom"

export interface BottomNavProps {
  active?: boolean
}
export const TokenBottomNav: FC<BottomNavProps> = ({ active }) => {
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
    <BottomNavContainer>
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
    </BottomNavContainer>
  )
}
