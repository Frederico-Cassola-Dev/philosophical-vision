import { Link } from "react-router-dom";
import singleLogo from "../../../assets/logo/single_logo_little.png";

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="">
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
