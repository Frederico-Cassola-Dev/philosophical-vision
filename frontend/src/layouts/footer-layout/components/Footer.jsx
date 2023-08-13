import { Link } from "react-router-dom";

import {
  FacebookIconLink,
  InstagramIconLink,
  LinkedInIconLink,
  GitHubIconLink,
  EmailIconLink,
} from "../../../common/components/social-links/SocialLinks";

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
          <FacebookIconLink size="22" classStyle="social-links" />
        </li>
        <li className="social-item-list">
          <InstagramIconLink size="22" classStyle="social-links" />
        </li>

        <li className="social-item-list">
          <LinkedInIconLink size="22" classStyle="social-links" />
        </li>
        <li className="social-item-list">
          <GitHubIconLink size="22" classStyle="social-links" />
        </li>
        <li className="social-item-list">
          <EmailIconLink size="22" classStyle="social-links" />
        </li>
      </ul>
    </footer>
  );
}
