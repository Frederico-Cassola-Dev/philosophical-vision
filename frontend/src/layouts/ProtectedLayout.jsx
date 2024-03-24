import { PropTypes } from "prop-types";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedLayout({ userRole }) {
  const location = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("user_info"));

  if (!userInfo) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  if (userRole === 1) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

ProtectedLayout.propTypes = {
  userRole: PropTypes.number,
};

ProtectedLayout.defaultProps = {
  userRole: null,
};
