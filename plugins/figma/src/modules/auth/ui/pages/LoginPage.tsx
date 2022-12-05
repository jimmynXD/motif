import { trpc } from "@/meta/ui"
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

  return <button onClick={handleOnClickLogin}>Log in</button>
}
