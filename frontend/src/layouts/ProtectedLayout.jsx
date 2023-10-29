// import { useContext } from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import userContext from "../contexts/userContext";
// import userContext from "../contexts/userContext";

export default function ProtectedLayout() {
  const { user } = useContext(userContext);
  console.info("🚀 - user from protected layout:", user);

  // const userInfo = JSON.parse(localStorage.getItem("user"));

  // const [isTokenExpired, setIsTokenExpired] = useState(false);

  // useEffect(() => {
  //   if (userInfo.token) {
  //     const decodedJwt = JSON.parse(atob(userInfo.token.split(".")[1]));

  //     if (decodedJwt.exp * 1000 < Date.now()) {
  //       setIsTokenExpired(true);
  //     } else {
  //       setIsTokenExpired(false);
  //     }
  //   } else {
  //     setIsTokenExpired(true);
  //   }
  // }, [isTokenExpired, userInfo.token]);

  // const loggedUser = localStorage.getItem("user");
  // console.info("🚀 - loggedUser:", loggedUser);

  // useEffect(() => {
  //   console.log(document.cookie);
  //   if (!document.cookie) {
  //     setUser(null);
  //     setToken(null);
  //     window.localStorage.clear();
  //   } else {
  //     const userFromLocalStorage = JSON.parse(
  //       localStorage.getItem("user_info")
  //     ).user;
  //     setUser(userFromLocalStorage);
  //   }
  // }, []);
  console.info("is user?????", !user);
  if (!document.cookie) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
