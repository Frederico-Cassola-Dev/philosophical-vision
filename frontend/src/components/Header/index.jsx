import { Link, useLocation } from "react-router-dom";
import singleLogo from "../../assets/logo/single_logo_little.png";

import style from "./_header.module.scss";

function Header() {
  const { pathname } = useLocation();
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
        <Link to="/signup" className={style.link}>
          Sign-Up
        </Link>
        <Link to="/signin" className={style.link}>
          Sign-in
        </Link>
      </nav>
    </header>
  );
}

export default Header;
