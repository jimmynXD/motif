import { BottomNavContainer } from "@/meta/ui"
import clsx from "clsx"
import { FC } from "react"

type LogoutHandlerProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const LogoutHandler: FC<LogoutHandlerProps> = ({ ...props }) => {
  return (
    <BottomNavContainer fluid>
      <div className={clsx("p-2 flex items-center")}>
        <button
          {...props}
          className={clsx(
            "button button-sm button-icon-ghost",
            "py-1",
            "text-xs leading-none"
          )}
        >
          <span className="material-symbols-rounded text-base">logout</span>
          <span>Log out</span>
        </button>
      </div>
    </BottomNavContainer>
  )
}
