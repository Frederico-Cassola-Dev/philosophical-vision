import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function EmailIconLink({ size, color, classStyle }) {
  const emailAddress = "frederico.cassola.dev@gmail.com";

  const handleEmailIconClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };
  return (
    <button type="button" aria-label="Email" onClick={handleEmailIconClick}>
      <svg
        type="button"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ cursor: "pointer" }}
        className={`feather feather-mail ${classStyle}`}
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    </button>
  );
}

export function FacebookIconLink({ size, color, classStyle }) {
  return (
    <Link
      to="https://www.facebook.com/fredericocassola/"
      aria-label="Facebook"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ cursor: "pointer" }}
        className={`feather feather-facebook ${classStyle}`}
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    </Link>
  );
}

export function GitHubIconLink({ size, color, classStyle }) {
  return (
    <Link
      to="https://github.com/Frederico-Cassola-Dev"
      aria-label="GitHub"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ cursor: "pointer" }}
        className={`feather feather-github ${classStyle}`}
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    </Link>
  );
}

export function InstagramIconLink({ size, color, classStyle }) {
  return (
    <Link
      to="https://www.instagram.com/fredericocassola/"
      aria-label="Instagram"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ cursor: "pointer" }}
        className={`feather feather-instagram ${classStyle}`}
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    </Link>
  );
}

export function LinkedInIconLink({ size, color, classStyle }) {
  return (
    <Link
      to="https://www.linkedin.com/in/frederico-cassola"
      aria-label="LinkedIn"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ cursor: "pointer" }}
        className={`feather feather-linkedin ${classStyle}`}
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    </Link>
  );
}

EmailIconLink.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  classStyle: PropTypes.string,
};

EmailIconLink.defaultProps = {
  size: "24",
  color: "currentColor",
  classStyle: "",
};
FacebookIconLink.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  classStyle: PropTypes.string,
};

FacebookIconLink.defaultProps = {
  size: "24",
  color: "currentColor",
  classStyle: "",
};
GitHubIconLink.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  classStyle: PropTypes.string,
};

GitHubIconLink.defaultProps = {
  size: "24",
  color: "currentColor",
  classStyle: "",
};
InstagramIconLink.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  classStyle: PropTypes.string,
};

InstagramIconLink.defaultProps = {
  size: "24",
  color: "currentColor",
  classStyle: "",
};
LinkedInIconLink.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  classStyle: PropTypes.string,
};

LinkedInIconLink.defaultProps = {
  size: "24",
  color: "currentColor",
  classStyle: "",
};
