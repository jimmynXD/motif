import clsx from "clsx"
import { ReactNode } from "react"
import { toast } from "react-hot-toast"

export enum Variant {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export interface ToastBannerInterface {
  children?: ReactNode
  duration?: number
  title: ReactNode
  variant?: Variant
}

export const ToastBanner = ({
  title,
  children,
  duration = 4000,
  variant = Variant.SUCCESS,
}: ToastBannerInterface) => {
  const variantClass = () => {
    switch (variant) {
      case "error":
        return "bg-red-800 text-white"
      case "warning":
        return "bg-yellow-800 text-white"
      case "info":
        return "bg-blue-800 text-white"
      case "success":
      default:
        return "bg-green-800 text-white"
    }
  }

  const bannerIcons = () => {
    switch (variant) {
      case "error":
        return "error"
      case "warning":
        return "warning"
      case "info":
        return "info"
      case "success":
      default:
        return "check_circle"
    }
  }
  const id = Math.random().toString(36).substring(7)

  const notify = toast.custom(
    <div
      className={clsx(
        variantClass(),
        "relative flex-1 rounded-xl transition-all"
      )}
    >
      <button
        onClick={() => toast.dismiss(id)}
        className="absolute top-2 right-2 button button-icon-ghost button-sm"
      >
        <span className="material-symbols-rounded text-sm text-white">
          close
        </span>
      </button>
      <div
        className={clsx("page-max-xl p-4 flex space-x-4", {
          "items-start": children,
          "items-center": !children,
        })}
      >
        <aside
          className={clsx({
            "flex items-center": !children,
          })}
        >
          <span className="text-inherit material-symbols-outlined">
            {bannerIcons()}
          </span>
        </aside>
        <div className="text-sm space-y-2">
          <div className="font-medium">{title}</div>
          {children && <p>{children}</p>}
        </div>
      </div>
    </div>,
    {
      duration: duration,
      position: "top-center",
      id,
    }
  )

  return notify
}
