import { FC } from "react"
import { useNavigate } from "react-router-dom"

export const LoginFailure: FC = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Failed to login</h1>
      <button onClick={() => navigate("/auth/login", { replace: true })}>
        Try login again
      </button>
    </div>
  )
}
