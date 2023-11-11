import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import style from "./phrases.module.scss";
import { IconHeart, IconStar } from "../../components/SvgIcons";

// TODO - like - NOT ASSOCIATE WITH USER
// TODO - favorite - NOT ASSOCIATE WITH USER
// TODO - CSS - bug on author when push the like button
// TODO - add feature - show the authors under the phrase -DONE
export default function PhraseItem({ phraseToShow, isFavorite }) {
  const [like, setLike] = useState({
    isLiked: false,
    phraseId: "",
  });
  const [favorite, setFavorite] = useState({
    isFavorite,
    phraseId: "",
  });

  useEffect(() => {
    if (like.phraseId && like.isLiked) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/phrases/likes/${
            like.phraseId
          }`,
          {
            phrase: phraseToShow.phrase,
            likes: phraseToShow.likes + 1,
            // is_favorite: phraseToShow.is_favorite,
            author_id: phraseToShow.author_id,
          }
        )
        .catch((err) => console.error(err));
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/phrases/${
            like.phraseId
          }`,
          {
            phrase: phraseToShow.phrase,
            likes: phraseToShow.likes + 1,
            // is_favorite: phraseToShow.is_favorite,
            author_id: phraseToShow.author_id,
          }
        )
        .catch((err) => console.error(err));
    } else if (like.phraseId && !like.isLiked) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/phrases/likes/${
            like.phraseId
          }`,
          {
            phrase: phraseToShow?.phrase,
            likes: phraseToShow?.likes,
            // is_favorite: phraseToShow?.is_favorite,
            author_id: phraseToShow?.author_id,
          }
        )
        .then((response) => console.info(response))
        .catch((err) => console.error(err));
    }
  }, [like.isLiked]);

  useEffect(() => {
    if (favorite.phraseId) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/phrases/favorites/${
            favorite.phraseId
          }`,
          {
            phrase: phraseToShow.phrase,
            is_favorite: !!favorite.isFavorite,
            likes: phraseToShow.likes,
            author_id: phraseToShow.author_id,
          }
        )
        .then((response) => console.info(response))
        .catch((err) => console.error(err));
    }
  }, [favorite.isFavorite]);

  return (
    <div key={phraseToShow.phrase_id}>
      <p className={style.visionPhrase}>{phraseToShow.phrase}</p>
      <div className={style.reactionsAndAutorContainer}>
        <span className={style.author}>Auteur: {phraseToShow.author}</span>
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
    likes: PropTypes.number.isRequired,
    author_id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
