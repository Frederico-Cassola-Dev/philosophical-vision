import { useContext, useEffect, useReducer } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import userContext from "../../contexts/userContext";
import SearchSelectModal from "../../components/SearchSelectModal";
import phrasesReducer, {
  OPEN_MODAL,
  INPUT_OPEN_MODAL,
  SELECT_OPEN_MODAL,
  SET_PHRASES,
  initialState,
} from "./utils/phrases-reducer";
import PhraseItem from "./PhraseItem";

import style from "./phrases.module.scss";

export default function Phrases() {
  const { user } = useContext(userContext);
  const [state, dispatch] = useReducer(phrasesReducer, initialState);
  // const navigate = useNavigate();

  const usersFavoritePhrases = useAxios(
    {
      method: "get",
      endpoint: `usersPhrases/favorites/${user?.id}`,
    },
    [state.phrasesToShow]
  );

  const totalLikes = useAxios(
    {
      method: "get",
      endpoint: "usersPhrases/totalLikes",
    },
    [state.phrasesToShow]
  );

  const categoriesData = useAxios({
    method: "get",
    endpoint: "categories",
  });

  //! Why this code?????????????
  // const logout = () => {
  //   setUser(null);
  //   setToken(null);
  //   localStorage.clear();
  //   document.cookie =
  //     "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //   navigate("/loggedOut");
  // };

  axios.defaults.withCredentials = true;

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

  //! Why this code?????????????
  // if (categoriesData?.error?.response.status === 401) {
  //   logout();
  // }

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
          placeholder="Événement"
        />
        <select
          aria-label="categories"
          value={state.categoryId}
          onChange={(e) => {
            dispatch({ type: OPEN_MODAL });
            dispatch({
              type: SELECT_OPEN_MODAL,
              payload: { categoryId: e.target.value },
            });
          }}
        >
          <option value="" disabled hidden>
            Catégorie
          </option>
          {categoriesData.response?.map((category) => (
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
        {state.phrasesToShow?.map((item) => {
          //! Maybe remove this code into a folder
          const foundFavoritePhrases = usersFavoritePhrases.response?.find(
            (phrase) => item.phrase_id === phrase.phrase_id
          );

          const foundTotalLikes = totalLikes.response?.find(
            (phrase) => item.phrase_id === phrase.phrase_id
          );

          return (
            <PhraseItem
              key={item.phrase_id}
              phraseToShow={item}
              isFavorite={!!foundFavoritePhrases?.is_favorite}
              isLiked={!!foundFavoritePhrases?.is_liked}
              usersPhrasesId={foundFavoritePhrases?.id}
              totalLikes={Number(foundTotalLikes?.total_likes) || 0}
            />
          );
        })}
      </div>
    </div>
  );
}
