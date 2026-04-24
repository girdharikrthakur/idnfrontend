import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("accessToken", token);  // ✅ THIS IS MISSING IN YOUR APP
      navigate("/");
    }
  }, []);

  return <div>Logging in...</div>;
}

export default OAuthSuccess;