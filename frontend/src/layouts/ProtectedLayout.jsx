// import { useContext } from "react";
// import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedLayout({ isAdmin }) {
  // console.log("🚀 - allowedRolle from user:", isAdmin);

  // console.log("🚀 - user:", user);
  const location = useLocation();
  // console.log("🚀 - location:", location);

  // const [isTokenExpired, setIsTokenExpired] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
  // console.log("🚀 - userInfo:", userInfo)

  // console.log("🚀 - userInfo:", userInfo);
  // console.log("🚀 - userInfo:", !!userInfo.user.is_admin);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (userInfo && userInfo.token) {
  //     const decodedJwt = JSON.parse(atob(userInfo.token.split(".")[1]));

  //     if (decodedJwt.exp * 1000 < Date.now()) {
  //       localStorage.clear();
  //       document.cookie =
  //         "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //       setIsTokenExpired(true);
  //     } else {
  //       setIsTokenExpired(false);
  //     }
  //   } else {
  //     navigate("/");
  //   }
  // }, []);

  if (!userInfo) {
    // console.log("no user");
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  if (isAdmin) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
  // if (isAdmin) {
  //   console.log("no user");
  //   return <Navigate to="/admin" state={{ from: location }} replace />;
  // }

  // if (isTokenExpired || !!userInfo.user.is_admin) {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
}

ProtectedLayout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
