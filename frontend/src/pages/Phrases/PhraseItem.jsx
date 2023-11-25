import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import style from "./phrases.module.scss";
import { IconHeart, IconStar } from "../../components/SvgIcons";
import userContext from "../../contexts/userContext";

// TODO - like - NOT ASSOCIATE WITH USER
// TODO - favorite - NOT ASSOCIATE WITH USER
// TODO - CSS - bug on author when push the like button
// TODO - add feature - show the authors under the phrase -DONE
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
          console.info(response);
          setNewUsersPhrasesId(response.data.insertId);
        })
        .catch((err) => console.error(err));
    }
  }, [favorite.isFavorite, like.isLiked]);

  return (
    <div key={phraseToShow.phrase_id}>
      <p className={style.visionPhrase}>{phraseToShow.phrase}</p>
      <div className={style.reactionsAndAuthorContainer}>
        <span className={style.author}>Auteur: {phraseToShow.author}</span>
        <span className={style.totalLikes}>
          {/* {isLiked && like.phraseId === phraseToShow.phrase_id
            ? totalLikes
            : Number(totalLikes) + 1} */}
          {/* {isLiked && like.phraseId === phraseToShow.phrase_id
            ? Number(totalLikes) - 1
            : Number(totalLikes) + 1 || 0} */}
          {/* {totalLikes || 0} */}
          {likesToShow || 0}
        </span>
        <button
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
        >
          <IconHeart alreadyLiked={isLiked} />
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
