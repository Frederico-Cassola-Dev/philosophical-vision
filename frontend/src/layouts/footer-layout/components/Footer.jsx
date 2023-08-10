import { Link } from "react-router-dom";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  GitHubIcon,
  EmailIcon,
} from "../../../assets/svg/social-icons/SocialIcons";

export default function Footer() {
  return (
    <footer className="footer">
      <Link to="/aboutme" className="about-me-link">
        <button type="button" className="about-me-button">
          About me
        </button>
      </Link>
      <ul className="social-list">
        <li className="social-item-list">
          <a href="#Facebook">
            <FacebookIcon />
          </a>
        </li>
        <li className="social-item-list">
          <a href="#Instagram">
            <InstagramIcon />
          </a>
        </li>

        <li className="social-item-list">
          <a href="#LinkedIn">
            <LinkedInIcon />
          </a>
        </li>
        <li className="social-item-list">
          <a href="#GitHub">
            <GitHubIcon />
          </a>
        </li>
        <li className="social-item-list">
          <a href="#mail">
            <EmailIcon />
          </a>
        </li>
      </ul>
    </footer>
  );
}
