import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import style from "./phrases.module.scss";
import { IconHeart, IconStar } from "../../components/SvgIcons";
import userContext from "../../contexts/userContext";

export default function PhraseItem({
  phraseToShow,
  isFavorite,
  isLiked,
  usersPhrasesId,
  totalLikes,
}) {
  const { user } = useContext(userContext);
  const [like, setLike] = useState({
    isLiked,
    phraseId: "",
  });
  const [favorite, setFavorite] = useState({
    isFavorite,
    phraseId: "",
  });
  const [newUsersPhrasesId, setNewUsersPhrasesId] = useState(usersPhrasesId);
  const [likesToShow, setLikesToShow] = useState(totalLikes);

  useEffect(() => {
    if (favorite.phraseId || like.phraseId) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/usersPhrases/${
            user?.id
          }/favoriteOrLiked/${favorite.phraseId || like.phraseId}`,
          {
            usersPhrasesId: newUsersPhrasesId,
            isFavorite: !!favorite.isFavorite,
            isLiked: !!like.isLiked,
          }
        )
        .then((response) => {
          setNewUsersPhrasesId(response.data.insertId);
        })
        .catch((err) => console.error(err));
    }
  }, [favorite.isFavorite, like.isLiked]);

  return (
    <div key={phraseToShow.phrase_id}>
      <p className={style.visionPhrase}>{phraseToShow.phrase}</p>
      <div className={style.reactionsAndAuthorContainer}>
        <span className={style.author}>
          Auteur: <strong>{phraseToShow.author}</strong>
        </span>
        <span className={style.totalLikes}>{likesToShow || 0}</span>
        <button
          id={`likeButton${phraseToShow.phrase_id}`}
          title="likeButton"
          type="button"
          className={style.likeButton}
          onClick={() => {
            setLike({
              isLiked: !like.isLiked,
              phraseId: phraseToShow.phrase_id,
            });
            if (like.isLiked) {
              setLikesToShow(() => likesToShow - 1);
            } else {
              setLikesToShow(() => likesToShow + 1);
            }
          }}
          aria-label="Phrase aimée ou non"
        >
          <IconHeart alreadyLiked={isLiked} />
        </button>
        <button
          type="button"
          id={`favoriteButton${phraseToShow.phrase_id}`}
          title="favoriteButton"
          className={style.favoriteButton}
          onClick={() => {
            setFavorite({
              isFavorite: !favorite.isFavorite,
              phraseId: phraseToShow.phrase_id,
            });
          }}
          aria-label="Phrase favorite ou non"
        >
          <IconStar alreadyFavorite={isFavorite} />
        </button>
      </div>
    </div>
  );
}

PhraseItem.propTypes = {
  phraseToShow: PropTypes.shape({
    phrase_id: PropTypes.number.isRequired,
    phrase: PropTypes.string.isRequired,
    author_id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  usersPhrasesId: PropTypes.number,
  totalLikes: PropTypes.number,
};

PhraseItem.defaultProps = {
  usersPhrasesId: 0,
  totalLikes: 0,
};
