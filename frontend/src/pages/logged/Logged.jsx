import { useReducer } from "react";
import useAxios from "../../common/hooks/useAxios";
import PageLoggedModal from "../../common/components/search-select-modal/SearchSelectModal";
import loggedReducer, {
  OPEN_MODAL,
  INPUT_OPEN_MODAL,
  SELECT_OPEN_MODAL,
} from "./utils/logged.reducer";

const initialState = {
  openModal: false,
  filteredEvent: "",
  categoryId: "",
  eventId: 1,
};

export default function Logged() {
  const [state, dispatch] = useReducer(loggedReducer, initialState);

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
      {state.openModal && <PageLoggedModal dispatch={dispatch} state={state} />}
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
