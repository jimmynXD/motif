import { trpc, IntroLayout } from "@/meta/ui"
import clsx from "clsx"
import { FC } from "react"
import { useNavigate } from "react-router-dom"
export const LoginPage: FC = () => {
  const createTokenMutation = trpc.auth.createToken.useMutation()
  const navigate = useNavigate()

  const handleOnClickLogin = async () => {
    const res = await createTokenMutation.mutateAsync({ deviceType: "figma" })
    window.open(`http://localhost:3000/auth/token/${res.token}`, "__blank")

    navigate(`/auth/login/${res.token}`, { replace: true })
  }

  return (
    <IntroLayout logoOnly>
      <section className="flex flex-col items-center w-full">
        <div className="px-4 w-full">
          <button
            className="button button-primary space-x-2 w-full"
            onClick={handleOnClickLogin}
          >
            <span className="material-symbols-rounded">login</span>
            <span>Log in</span>
          </button>
        </div>
        <footer
          className={clsx(
            "pt-4 flex items-center justify-center",
            "w-full",
            "text-center text-sm"
          )}
        >
          Don&apos;t have an account?{" "}
          <button
            className={clsx("button button-link text-sm")}
            onClick={handleOnClickLogin}
          >
            Create an account
          </button>
        </footer>
      </section>
    </IntroLayout>
  )
}
