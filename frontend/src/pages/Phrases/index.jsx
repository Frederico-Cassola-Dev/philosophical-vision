import { useEffect, useReducer, useState } from "react";
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
  const [state, dispatch] = useReducer(phrasesReducer, initialState);
  const [like, setLike] = useState({ isLiked: false, phraseId: "" });
  const [favorite, setFavorite] = useState({
    isFavorite: false,
    phraseId: "",
  });

  const categoriesResponse = useAxios({
    method: "get",
    endpoint: "categories",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/phrases4/events/${state.eventId}`)
      .then((response) =>
        dispatch({
          type: SET_PHRASES,
          payload: { phrasesToShow: response.data },
        })
      )
      .catch((err) => console.error(err));
  }, [state.eventId]);

  useEffect(() => {
    // const filteredLikedPhrase = state.phrasesToShow.filter(
    //   (item) => item.id === like.phraseId
    // );
    // console.log("🚀 - filteredLikedPhrase:", state.phrasesToShow);
    // axios
    //   .post(`http://localhost:5000/api/phrases/${like.phraseId}`, {
    //     phrase: filteredLikedPhrase,
    //   })
    //   .then(() => console.info("Phrase updated"))
    //   .catch((err) => console.error(err));
  }, [state.eventId]);

  return (
    <div className={style.logged}>
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
                <span className={style.totalLikes}>likes: 30</span>
                <button
                  type="button"
                  className={style.likeButton}
                  onClick={() =>
                    setLike({
                      isFavorite: !like.isLiked,
                      phraseId: item.phrase_id,
                    })
                  }
                >
                  <IconHeart />
                </button>
                <button
                  type="button"
                  className={style.favoriteButton}
                  onClick={() =>
                    setFavorite({
                      isFavorite: !favorite.isFavorite,
                      phraseId: item.phrase_id,
                    })
                  }
                >
                  <IconStar />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
