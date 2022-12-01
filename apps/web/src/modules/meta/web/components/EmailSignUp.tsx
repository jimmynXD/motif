import clsx from "clsx"
import { FC, useState } from "react"

import { ToastBanner, Variant } from "./Banner"
import { trpc } from "@/meta/web"

interface EmailSignUpProps {
  full?: boolean
  inputId: string
}
export const EmailSignUp: FC<EmailSignUpProps> = ({ full, inputId }) => {
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
      className={clsx("group pt-8", "w-full", {
        "lg:max-w-lg lg:pl-4": !full,
      })}
    >
      <div
        id="signup"
        className={clsx(
          "md:flex md:items-center md:flex-col",
          "bg-slate-800 px-4 py-8 ring ring-purple-300 group-focus-within:bg-purple-600",
          "transition-all",
          {
            "lg:rounded-lg": !full,
          }
        )}
      >
        <label className={clsx("space-y-2", "max-w-lg md:w-full")}>
          <div className="text-lg font-medium px-4 w-full text-center">
            Early access to tailwindcss plugin for devs
          </div>
          <div className="lg:max-w-lg bg-white flex items-center rounded-full pl-1 group-focus-within:ring group-focus-within:ring-purple-300">
            <input
              type={"email"}
              id={inputId}
              name={inputId}
              placeholder={"Enter your email"}
              value={emailInput}
              onChange={handleInputOnChange}
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
  )
}
