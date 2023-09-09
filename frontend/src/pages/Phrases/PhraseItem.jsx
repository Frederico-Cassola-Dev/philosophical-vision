import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import style from "./_phrases.module.scss";
import { IconHeart, IconStar } from "../../components/SvgIcons";

export default function PhraseItem({ phraseToShow }) {
  const [like, setLike] = useState({
    isLiked: false,
    phraseId: "",
  });
  const [favorite, setFavorite] = useState({
    isFavorite: phraseToShow.is_favorite,
    phraseId: "",
  });

  // TODO - like need testing
  useEffect(() => {
    if (like.phraseId && like.isLiked) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/phrases/${like.phraseId}`,
          {
            phrase: phraseToShow.phrase,
            likes: phraseToShow.likes + 1,
            is_favorite: phraseToShow.is_favorite,
            authors_id: phraseToShow.authors_id,
          }
        )
        .then(() => {
          if (like.isLiked) {
            console.info("Phrase liked + 1");
          } else {
            console.info("Phrase liked - 1");
          }
        })
        .catch((err) => console.error(err));
    } else if (like.phraseId && !like.isLiked) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/phrases/${like.phraseId}`,
          {
            phrase: phraseToShow?.phrase,
            likes: phraseToShow.likes,
            is_favorite: phraseToShow?.is_favorite,
            authors_id: phraseToShow?.authors_id,
          }
        )
        .then(() => {
          if (like.isLiked) {
            console.info("Phrase liked + 1");
          } else {
            console.info("Phrase liked - 1");
          }
        })
        .catch((err) => console.error(err));
    }
  }, [like.isLiked]);

  // TODO - favorite need testing
  useEffect(() => {
    if (favorite.phraseId) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/phrases/${
            favorite.phraseId
          }`,
          {
            phrase: phraseToShow.phrase,
            is_favorite: !!favorite.isFavorite,
            likes: like.numberLikes,
            authors_id: phraseToShow.authors_id,
          }
        )
        .catch((err) => console.error(err));
    }
  }, [favorite.isFavorite]);
  return (
    <div key={phraseToShow.phrase_id}>
      <p className={style.visionPhrase}>{phraseToShow.phrase}</p>
      <div className={style.reactionsButtonContainer}>
        <span className={style.totalLikes}>
          {like.isLiked && like.phraseId === phraseToShow.phrase_id
            ? phraseToShow.likes + 1
            : phraseToShow.likes}
        </span>
        <button
          type="button"
          className={style.likeButton}
          onClick={() =>
            setLike({
              isLiked: !like.isLiked,
              phraseId: phraseToShow.phrase_id,
            })
          }
        >
          <IconHeart />
        </button>
        <button
          type="button"
          className={style.favoriteButton}
          onClick={() => {
            setFavorite({
              isFavorite: !favorite.isFavorite,
              phraseId: phraseToShow.phrase_id,
            });
          }}
        >
          <IconStar alreadyFavorite={!!phraseToShow.is_favorite} />
        </button>
      </div>
    </div>
  );
}

PhraseItem.propTypes = {
  phraseToShow: PropTypes.shape({
    phrase_id: PropTypes.number.isRequired,
    phrase: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    is_favorite: PropTypes.number.isRequired,
    authors_id: PropTypes.number.isRequired,
  }).isRequired,
};
