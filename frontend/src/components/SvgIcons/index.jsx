import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export function IconHeart({ alreadyLiked }) {
  const [fill, setFill] = useState(false);

  useEffect(() => {
    if (alreadyLiked) {
      setFill(true);
    }
  }, [alreadyLiked]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={fill ? "red" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={() => setFill(!fill)}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

IconHeart.propTypes = {
  alreadyLiked: PropTypes.bool.isRequired,
};

export function IconStar({ alreadyFavorite }) {
  const [fill, setFill] = useState(false);

  useEffect(() => {
    if (alreadyFavorite) {
      setFill(true);
    }
  }, [alreadyFavorite]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={fill ? "orange" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      onClick={() => {
        setFill(!fill);
      }}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

IconStar.propTypes = {
  alreadyFavorite: PropTypes.bool.isRequired,
};

export function IconAdd() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-plus"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
export function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-x"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
