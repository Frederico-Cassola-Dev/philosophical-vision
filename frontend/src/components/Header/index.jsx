import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import userContext from "../../contexts/userContext";

import singleLogo from "../../assets/logo/single_logo_little.png";
import style from "./_header.module.scss";

function Header() {
  const { pathname } = useLocation();
  // console.log("🚀 - pathname:", pathname)

  const { user, setUser, setToken } = useContext(userContext);
  const navigate = useNavigate();
  // console.log("🚀 - user:", user);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    // document.cookie =
    //   "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  return (
    <header className={style.header}>
      <div className={style.logoContainer}>
        <Link
          to="/"
          className={
            pathname === "/"
              ? `${(style.logoContainer, style.hiddenLogo)}`
              : `${style.logoContainer}`
          }
        >
          <img src={singleLogo} alt="logo" />
        </Link>
      </div>
      <nav>
        {user ? (
          <>
            <Link to="/" className={style.link} onClick={logout}>
              Déconnecter
            </Link>
            {pathname === "/phrases" && (
              <Link to="/myAccount" className={style.link}>
                Mon compte
              </Link>
            )}
            {pathname === "/myAccount" && (
              <Link to="/phrases" className={style.link}>
                Phrases
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/signUp" className={style.link}>
              Inscription
            </Link>
            <Link to="/signIn" className={style.link}>
              Connection
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
