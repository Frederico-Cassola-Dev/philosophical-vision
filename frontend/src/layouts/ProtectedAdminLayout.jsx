// import { useContext } from "react";
// import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedAdminLayout({ isAdmin }) {
  // const [isTokenExpired, setIsTokenExpired] = useState(false);
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("user_info"));
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

  if (!isAdmin) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

ProtectedAdminLayout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
