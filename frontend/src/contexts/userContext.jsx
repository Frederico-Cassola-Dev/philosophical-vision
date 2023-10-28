import { createContext, useEffect, useMemo, useState } from "react";
import { PropTypes } from "prop-types";

const userContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    // console.log("🚀 - loggedUser:", loggedUser);

    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
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
