import { useState, useReducer } from "react";
import useAxios from "../../common/hooks/useAxios";
import PageLoggedModal from "../../common/components/search-select-modal/SearchSelectModal";

const initialState = {
  filteredCategory: "",
  openModal: false,
  categoryId: "",
  eventId: 1,
};

function homeReducer(state, action) {
  switch (action.type) {
    case "openModalSelect": {
      return {
        ...state,
        openModal: action.payload.openModal,
        categoryId: action.payload.categoryId,
        eventId: action.payload.eventId,
      };
    }
    // case "openModalInput": {
    //   return {
    //     ...state,
    //     openModal: action.payload,
    //     categoryId: action.payload.categoryId,
    //   };
    // }
    default:
      return state;
  }
}

export default function Logged() {
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const { openModal } = state;
  const [filteredCategory, setFilteredCategory] = useState("");

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
      {openModal && <PageLoggedModal dispatch={dispatch} state={state} />}
      <div className="inputs-container">
        <input
          type="text"
          className={
            openModal
              ? "input-search-category show-input-search-event"
              : "input-search-category"
          }
          onChange={(e) => {
            dispatch({ type: "openModal", categoryId: e.target.value });
            setFilteredCategory(e.target.value);
          }}
          value={openModal ? filteredCategory : ""}
          placeholder="Search your event"
        />
        <select
          name=""
          id=""
          onChange={(e) => {
            dispatch({
              type: "openModalSelect",
              payload: { openModal: true, categoryId: e.target.value },
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
