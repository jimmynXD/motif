import clsx from "clsx"
import Image from "next/image"
import { FC, useState } from "react"
import TokensPNG from "../assets/tokens.png"
import DeployPNG from "../assets/deploy.png"
import { ToastBanner, Variant } from "./Banner"
import { trpc } from "@/meta/web"
export const HeroBanner: FC = () => {
  // get mutation function
  const earlyAccessMutation = trpc.user.createEarlyAccessEntry.useMutation()
  const [emailInput, setEmailInput] = useState<string>("")

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value)
  }

  const handleEmailSubmit = async () => {
    if (!emailInput) return

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if (!emailRegex.test(emailInput)) {
      ToastBanner({
        title: "Please enter a valid email",
        variant: Variant.ERROR,
      })
      return
    }

    try {
      await earlyAccessMutation.mutateAsync({ email: emailInput })
      ToastBanner({
        duration: 10000,
        title: (
          <span>
            You have signed up with{" "}
            <b className="underline underline-offset-2">{emailInput}</b>.
          </span>
        ),
        children:
          "Next steps is to be on the lookout for an email from us. We anticipate before the new year.",
      })
    } catch (error) {
      ToastBanner({
        title: "Already registered. Thank you much again!",
        variant: Variant.ERROR,
      })
    }
    setEmailInput("")
  }

  return (
    <div
      className={clsx("page-max-xl flex flex-col items-center", "lg:flex-row")}
    >
      <section
        className={clsx(
          "flex flex-col md:items-center w-full",
          "lg:w-[unset] lg:pr-12"
        )}
      >
        <div className={clsx("px-4 md:max-w-lg space-y-8 text-left")}>
          <div
            className={clsx("font-bold tracking-wider text-2xl", "md:text-3xl")}
          >
            Your Design System as an API
          </div>
          <p>
            Handoffs between designer to developer just got a whole lot easier!
            Designers create and update their styles in Figma, we translate
            those styles and create an API, all while the devs sit back and get
            it in directly into their codebase.
          </p>
          <div
            className={clsx(
              "text-xl font-medium",
              "md:text-2xl md:text-center md:py-4",
              "lg:text-left"
            )}
          >
            The future of design systems are here XD
          </div>
        </div>
        <div className={clsx("group pt-8", "w-full", "lg:max-w-lg lg:pl-4")}>
          <div
            id="signup"
            className={clsx(
              "bg-slate-800 px-4 py-8 ring ring-purple-300 group-focus-within:bg-purple-600",
              "transition-all",
              "md:flex md:justify-center",
              "lg:rounded-xl"
            )}
          >
            <label className={clsx("space-y-2", "max-w-lg md:w-full")}>
              <span className="text-lg font-medium px-4">
                Sign up to get early access
              </span>
              <div className="max-w-lg bg-white flex items-center rounded-full pl-1 group-focus-within:ring group-focus-within:ring-purple-300">
                <input
                  type={"email"}
                  id={"signupEmail"}
                  name={"signupEmail"}
                  placeholder={"Enter your email"}
                  value={emailInput}
                  onChange={handleInputOnChange}
                  // submit on enter
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleEmailSubmit()
                    }
                  }}
                  className={clsx(
                    "w-full",
                    "bg-transparent border-none focus-visible:outline-none focus:ring-0"
                  )}
                />
                {emailInput && (
                  <button
                    className="button button-icon-ghost button-sm text-red-800 material-symbols-rounded rounded-full focus-visible:outline-red-800"
                    onClick={() => {
                      setEmailInput("")
                    }}
                  >
                    close
                  </button>
                )}
                <button
                  type="submit"
                  onClick={handleEmailSubmit}
                  className="rounded-full button button-icon-ghost button-sm focus-visible:outline-purple-800"
                >
                  <span className="material-symbols-rounded text-xd-secondary-black-rgb">
                    send
                  </span>
                </button>
              </div>
            </label>
          </div>
        </div>
      </section>
      <aside className={clsx("pt-16 z-[1]", "lg:pt-0 lg:pr-4")}>
        <div
          className={clsx(
            "flex flex-col space-y-4",
            "md:flex-row md:space-y-0 md:space-x-8",
            "lg:space-x-1"
          )}
        >
          <span>
            <Image src={TokensPNG} alt="demo-image" />
          </span>
          <span>
            <Image src={DeployPNG} alt="demo-image" />
          </span>
        </div>
      </aside>
    </div>
  )
}
