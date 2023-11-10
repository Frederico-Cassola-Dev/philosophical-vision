import { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
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

import style from "./phrases.module.scss";
import PhraseItem from "./PhraseItem";
import userContext from "../../contexts/userContext";

export default function Phrases() {
  const { setUser, setToken } = useContext(userContext);
  const navigate = useNavigate();

  // TODO - verify if no access navigate for the page error or unauthorize access
  // TODO - Test this function logout if it's useful for this step
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    document.cookie =
      "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  const [state, dispatch] = useReducer(phrasesReducer, initialState);

  const categoriesData = useAxios({
    method: "get",
    endpoint: "categories",
  });

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

  if (categoriesData?.error?.response.status === 401) {
    logout();
  }

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
          <option defaultChecked>Selecione une catégorie</option>
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
        {state.phrasesToShow &&
          state.phrasesToShow?.map((item) => (
            <PhraseItem key={item.phrase_id} phraseToShow={item} />
          ))}
      </div>
    </div>
  );
}
