import clsx from "clsx"

export const LoadingLogo = () => {
  return (
    <div
      className={clsx(
        "relative w-20 h-20 rounded-full flex items-center justify-center",
        "before:animate-pulse after:animate-pulse",
        "before:content-[''] before:rounded-full before:absolute before:inset-0 before:ring-8 before:ring-yellow-400 before:z-10",
        "after:content-[''] after:rounded-full after:absolute after:inset-0 after:ring-8 after:ring-blue-400 after:ring-offset-8"
      )}
    >
      <img src={require("../assets/logo.svg")} className="w-12 h-12" />
    </div>
  )
}
