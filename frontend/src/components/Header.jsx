import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
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
