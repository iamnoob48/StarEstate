import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const username = params.get('username')

    if (token) {
      localStorage.setItem("token", token);
      localStorage.removeItem('username');
      localStorage.setItem('username', username);
      navigate("/");
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  return <div>Logging in...</div>;
}
