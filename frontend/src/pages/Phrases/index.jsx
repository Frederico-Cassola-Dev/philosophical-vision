import { useEffect, useReducer } from "react";
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

export default function Phrases() {
  const [state, dispatch] = useReducer(phrasesReducer, initialState);

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

  return (
    <div className="logged">
      {state.openModal && (
        <SearchSelectModal state={state} dispatch={dispatch} />
      )}
      <div className="inputs-container">
        <input
          type="text"
          className={
            state.openModal
              ? "input-search-category show-input-search-event"
              : "input-search-category"
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
          name=""
          id=""
          onChange={(e) => {
            dispatch({ type: OPEN_MODAL });
            dispatch({
              type: SELECT_OPEN_MODAL,
              payload: { categoryId: e.target.value },
            });
          }}
          value=""
        >
          <option defaultChecked>Select a category</option>
          {categoriesResponse?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="life-event-container">
        <p className="life-event-phrase">
          {state.phrasesToShow && state.phrasesToShow[0]?.event_title}
          {/* phrasesResponseByEventId[0]?.event_title  */}
        </p>
      </div>
      <div className="visions-container">
        {state.phrasesToShow &&
          state.phrasesToShow?.map((item) => (
            <p className="vision-phrase" key={item.phrase_id}>
              {item.phrase}
            </p>
          ))}
        {/* : phrasesResponse?.map((item) => (
              <p className="vision-phrase" key={item.phrase_id}>
                {item.phrase}
              </p>
            )) */}
      </div>
    </div>
  );
}
