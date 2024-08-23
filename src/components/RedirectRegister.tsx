import { useNavigate } from "react-router-dom"

function RedirectRegister() {
  const navigate = useNavigate();
  const handleRedirectRegister = () => {
    navigate("/register")
  }

  return (
    <button type="button" onClick={handleRedirectRegister}>Register</button>
  )
}

export default RedirectRegister