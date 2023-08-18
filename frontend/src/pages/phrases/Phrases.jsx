import { useContext } from "react";
import useAxios from "../../common/hooks/useAxios";
import SearchSelectModal from "../../common/components/search-select-modal/SearchSelectModal";
import {
  OPEN_MODAL,
  INPUT_OPEN_MODAL,
  SELECT_OPEN_MODAL,
} from "./utils/phrases-reducer";
import { PhrasesContext } from "../../common/contexts/phrasesContext";

export default function Phrases() {
  const { state, dispatch } = useContext(PhrasesContext);

  const categoriesResponse = useAxios({
    method: "get",
    endpoint: "categories",
  });

  const phrasesResponse = useAxios({
    method: "get",
    endpoint: `phrases/events/${state.eventId}`,
  });

  return (
    <div className="logged">
      {state.openModal && <SearchSelectModal />}
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
          {phrasesResponse && phrasesResponse[0]?.event_title}
        </p>
      </div>
      <div className="visions-container">
        {phrasesResponse?.map((item) => (
          <p className="vision-phrase" key={item.id}>
            {item.phrase}
          </p>
        ))}
      </div>
    </div>
  );
}
