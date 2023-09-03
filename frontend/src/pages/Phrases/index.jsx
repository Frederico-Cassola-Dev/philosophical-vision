import { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import SearchSelectModal from "../../components/SearchSelectModal";
import phrasesReducer, {
  OPEN_MODAL,
  INPUT_OPEN_MODAL,
  SELECT_OPEN_MODAL,
  SET_PHRASES,
  initialState,
} from "./utils/phrases-reducer";

import style from "./_phrases.module.scss";
import { IconHeart, IconStar } from "../../components/SvgIcons";

export default function Phrases() {
  const refFavorite = useRef();
  // console.log("🚀 - refFavorite:", refFavorite);

  const [state, dispatch] = useReducer(phrasesReducer, initialState);
  const [like, setLike] = useState({
    isLiked: false,
    phraseId: "",
  });

  const [favorite, setFavorite] = useState({
    isFavorite: false,
    phraseId: "",
  });
  // console.log("🚀 - favorite:", favorite);

  const categoriesResponse = useAxios({
    method: "get",
    endpoint: "categories",
  });

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/phrases4/events/${
          state.eventId
        }`
      )
      .then((response) =>
        dispatch({
          type: SET_PHRASES,
          payload: { phrasesToShow: response.data },
        })
      )
      .catch((err) => console.error(err));
  }, [state.eventId]);

  // TODO - like not functional
  useEffect(() => {
    if (state.phrasesToShow) {
      const likedPhrase = state.phrasesToShow.find(
        (item) => item.phrase_id === like.phraseId
      );

      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/phrases/${like.phraseId}`,
          {
            phrase: likedPhrase?.phrase,
            likes: like.isLiked ? likedPhrase.likes + 1 : likedPhrase.likes - 1,
            is_favorite: likedPhrase?.is_favorite,
            authors_id: likedPhrase?.authors_id,
          }
        )
        .then(() => {
          if (like.isLiked) {
            console.info("Phrase updated + 1");
          } else {
            console.info("Phrase updated - 1");
          }
        })
        .catch((err) => console.error(err));
    }
  }, [like]);

  // TODO - favorite not functional
  useEffect(() => {
    if (state.phrasesToShow) {
      const favoritePhrase = state.phrasesToShow.find(
        (item) => item.phrase_id === favorite.phraseId
      );
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/phrases/${
            favorite.phraseId
          }`,
          {
            phrase: favoritePhrase?.phrase,
            is_favorite: favorite?.isFavorite,
            likes: favoritePhrase?.likes,
            authors_id: favoritePhrase?.authors_id,
          }
        )
        .then(() => {
          if (favorite.isFavorite) {
            console.info("Phrase Favorite updated + 1");
            refFavorite.current = favorite.isFavorite;
            // console.log(
            //   "refFavorite Second State in useEfefect",
            //   refFavorite.current
            // );
          } else {
            console.info("Phrase Favorite updated - 1");
            refFavorite.current = favorite.isFavorite;
            // console.log(
            //   "refFavorite Second State in useEfefect",
            //   refFavorite.current
            // );
          }
        })
        .catch((err) => console.error(err));
    }
  }, [favorite]);

  return (
    <div className={style.phrases}>
      {state.openModal && (
        <SearchSelectModal state={state} dispatch={dispatch} />
      )}
      <div className={style.inputsContainer}>
        <input
          type="text"
          className={
            state.openModal
              ? `${style.inputSearchCategory} ${style.showInputSearchEvent}`
              : style.inputSearchCategory
          }
          onChange={(e) => {
            dispatch({ type: OPEN_MODAL });
            dispatch({
              type: INPUT_OPEN_MODAL,
              payload: { filteredEvent: e.target.value },
            });
          }}
          value={state.openModal ? state.filteredEvent : ""}
          placeholder="Search your event"
        />
        <select
          onChange={(e) => {
            dispatch({ type: OPEN_MODAL });
            dispatch({
              type: SELECT_OPEN_MODAL,
              payload: { categoryId: e.target.value },
            });
          }}
        >
          <option defaultChecked>Select a category</option>
          {categoriesResponse?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className={style.lifeEventContainer}>
        <p className={style.lifeEventPhrase}>
          {state.phrasesToShow && state.phrasesToShow[0]?.event_title}
        </p>
      </div>
      <div className={style.visionsContainer}>
        {state.phrasesToShow &&
          state.phrasesToShow?.map((item) => (
            <div key={item.phrase_id}>
              <p className={style.visionPhrase}>{item.phrase}</p>
              <div className={style.reactionsButtonContainer}>
                <span className={style.totalLikes}>
                  {like.isLiked && like.phraseId === item.phrase_id
                    ? item.likes + 1
                    : item.likes}
                </span>
                <button
                  type="button"
                  className={style.likeButton}
                  onClick={() =>
                    setLike({
                      isLiked: !like.isLiked,
                      phraseId: item.phrase_id,
                    })
                  }
                >
                  <IconHeart />
                </button>
                <button
                  type="button"
                  className={style.favoriteButton}
                  onClick={() => {
                    // console.log("Clicked");
                    refFavorite.current = !!item.is_favorite;
                    setFavorite({
                      isFavorite: !refFavorite.current,
                      phraseId: item.phrase_id,
                    });
                  }}
                >
                  <IconStar alreadyFavorite={!!item.is_favorite} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
