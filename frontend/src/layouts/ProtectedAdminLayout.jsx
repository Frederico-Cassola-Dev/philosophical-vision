import { PropTypes } from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedAdminLayout({ userRole }) {
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("user_info"));

  if (!userInfo) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  if (userRole === 2) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

ProtectedAdminLayout.propTypes = {
  userRole: PropTypes.number,
};

ProtectedAdminLayout.defaultProps = {
  userRole: null,
};
