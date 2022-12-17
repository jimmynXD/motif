import { DiffStateUI } from "@/meta/ui"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

export const LoginFailure: FC = () => {
  const navigate = useNavigate()
  return (
    <DiffStateUI
      subMsg={
        <button
          onClick={() => navigate("/auth/login", { replace: true })}
          className="button button-primary button-sm"
        >
          Try login again
        </button>
      }
    >
      Login failed
    </DiffStateUI>
  )
}
