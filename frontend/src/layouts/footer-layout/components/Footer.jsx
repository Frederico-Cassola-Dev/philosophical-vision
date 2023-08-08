import FacebookIcon from "../../../assets/svg/FacebookIcon";
import InstagramIcon from "../../../assets/svg/InstagramIcon";
import LinkedInIcon from "../../../assets/svg/LinkedInIcon";
import GitHubIcon from "../../../assets/svg/GitHubIcon";
import EmailIcon from "../../../assets/svg/EmailIcon";

function Footer() {
  return (
    <footer className="footer">
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

export default Footer;
