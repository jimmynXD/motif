import { FC } from "react"
import clsx from "clsx"
import { NavLink } from "react-router-dom"

export const TopNav: FC = () => {
  const NavArray = [
    {
      name: "Tokens",
      path: "/",
    },
    {
      name: "Deploy",
      path: "/deploy",
    },
  ]

  return (
    <section className="flex bg-white sticky top-0 z-10">
      {NavArray.map((nav) => (
        <NavLink
          key={nav.path}
          to={nav.path}
          className={({ isActive }) =>
            clsx(
              "text-center text-sm py-2 text-xd-secondary-black-rgb w-full border-b-2",
              {
                "text-xd-primary-purple-700 border-b-xd-primary-purple-700":
                  isActive,
                "border-b-xd-neutral-300": !isActive,
              }
            )
          }
        >
          {nav.name}
        </NavLink>
      ))}
    </section>
  )
}
