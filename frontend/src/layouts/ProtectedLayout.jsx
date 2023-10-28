// import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import userContext from "../contexts/userContext";

export default function ProtectedLayout() {
  // const { user } = useContext(userContext);
  // console.log("🚀 - user from protected layout:", user);

  const loggedUser = localStorage.getItem("user");
  // console.log("🚀 - loggedUser:", loggedUser);

  if (!loggedUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
