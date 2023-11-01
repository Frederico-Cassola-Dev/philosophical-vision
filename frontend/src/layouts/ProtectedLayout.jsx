// import { useContext } from "react";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function ProtectedLayout() {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.token) {
      const decodedJwt = JSON.parse(atob(userInfo.token.split(".")[1]));

      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.clear();
        document.cookie =
          "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsTokenExpired(true);
      } else {
        setIsTokenExpired(false);
      }
    } else {
      navigate("/");
    }
  }, []);

  if (isTokenExpired) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
