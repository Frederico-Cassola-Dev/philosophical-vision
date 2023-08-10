import { Link, useLocation } from "react-router-dom";
import singleLogo from "../../../assets/logo/single_logo_little.png";

function Header() {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className="logo-container">
        <Link
          to="/"
          className={
            pathname === "/" ? "logo-container hidden-logo" : "logo-container"
          }
        >
          <img src={singleLogo} alt="logo" />
        </Link>
      </div>
      <nav>
        <Link to="/signup" className="link">
          Sign-Up
        </Link>
        <Link to="/signin" className="link">
          Sign-in
        </Link>
      </nav>
    </header>
  );
}

export default Header;
