import { createContext, useMemo, useState } from "react";
import { PropTypes } from "prop-types";

const userContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  console.info("🚀 - user from context:", user);
  const [token, setToken] = useState(null);
  console.info("🚀 - token from context:", token);

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
  // console.log("🚀 - token from context:", token);
  // const [isUserLogged, setIsUserLogged] = useState(null);
  // console.info("🚀 - isUserLogged from context:", isUserLogged);

  // useEffect(() => {
  //   let userInfo = JSON.parse(localStorage.getItem("user"));
  //   console.info("🚀 - userInfo:", userInfo);

  //   if (userInfo) {
  //     const decodedJWT = atob(userInfo.token.split(".")[1]);
  //     console.log("🚀 - decodedJWT:", decodedJWT);

  //     if (
  //       userInfo.isLogged &&
  //       !JSON.parse(decodedJWT).exp * 1000 < Date.now()
  //     ) {
  //       setIsUserLogged(true);
  //     } else {
  //       setIsUserLogged(false);
  //       localStorage.clear();
  //       userInfo = "";
  //     }
  //   }
  //   console.info("🚀 - Date.now():", Date.now());
  //   console.info(
  //     "🚀 - JSON.parse(decodedJWT).exp:",
  //     JSON.parse(decodedJWT).exp * 1000
  //   );

  //   if (JSON.parse(decodedJWT).exp * 1000 < Date.now()) {
  //     console.info("Date token menor que date actual")
  //     setIsUserLogged(false);
  //     localStorage.clear();
  //   } else {
  //     console.info("Date token maior que date actual")
  //     setIsUserLogged(true);
  //   }

  // const date = new Date();
  // console.log("expires", new Date(Date.now() + 1000 * 60 * 60));
  // console.log("date now", new Date(Date.now()));
  // console.log("decode exp", new Date(JSON.parse(decodedJWT).exp * 1000));
  // console.log(
  //   "difference timestamp",
  //   JSON.parse(decodedJWT).exp * 1000 - date.getTime(),
  //   JSON.parse(decodedJWT).exp * 1000 - Date.now()
  // );
  // }
  // console.log("🚀 - userInfo.token from context:", JSON.parse(userInfo.token));
  // if (JSON.parse(userInfo)) {
  //   const decodedJwt = JSON.parse(
  //     atob(JSON.parse(userInfo).token.split(".")[1])
  //   );
  //   console.log("hello", decodedJwt.exp);
  //   console.log("hello decode", decodedJwt.exp * 1000 < Date.now());

  //   if (!decodedJwt.exp * 1000 < Date.now()) {
  //     // console.log("🚀 - loggedUser:", loggedUser);
  //     setUser(JSON.parse(userInfo.user));
  //     setIsUserLogged(true);
  //   }
  // }
  // });

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      // isUserLogged,
    }),
    [user]
  );
  // console.log("🚀 - user:", user);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default userContext;
