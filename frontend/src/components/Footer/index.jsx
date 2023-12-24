import { Link } from "react-router-dom";

import {
  FacebookIconLink,
  InstagramIconLink,
  LinkedInIconLink,
  GitHubIconLink,
  EmailIconLink,
} from "../SocialLinks";

import style from "./_footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <Link to="/aboutMe" className={style.aboutMeLink}>
        <button type="button" className={style.aboutMeButton}>
          À propos de moi
        </button>
      </Link>
      <ul className={style.socialList}>
        <li className={style.socialItemList}>
          <FacebookIconLink size="22" classStyle={style.socialLinks} />
        </li>
        <li className={style.socialItemList}>
          <InstagramIconLink size="22" classStyle={style.socialLinks} />
        </li>

        <li className={style.socialItemList}>
          <LinkedInIconLink size="22" classStyle={style.socialLinks} />
        </li>
        <li className={style.socialItemList}>
          <GitHubIconLink size="22" classStyle={style.socialLinks} />
        </li>
        <li className={style.socialItemList}>
          <EmailIconLink size="22" classStyle={style.socialLinks} />
        </li>
      </ul>
    </footer>
  );
}
