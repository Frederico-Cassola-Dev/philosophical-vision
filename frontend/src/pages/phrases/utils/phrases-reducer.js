export const SELECT_OPEN_MODAL = "openModalSelect";
export const INPUT_OPEN_MODAL = "openModalInput";
export const OPEN_MODAL = "openModal";
export const CLOSE_MODAL = "closeModal";

export const initialState = {
  openModal: false,
  filteredEvent: "",
  categoryId: "",
  eventId: "1",
};

export default function phrasesReducer(state, action) {
  switch (action.type) {
    case INPUT_OPEN_MODAL: {
      const { filteredEvent } = action.payload;
      return {
        ...state,
        filteredEvent,
        categoryId: "",
      };
    }

    case SELECT_OPEN_MODAL: {
      const { categoryId, eventId } = action.payload;
      return {
        ...state,
        categoryId,
        eventId,
      };
    }

    case OPEN_MODAL: {
      return {
        ...state,
        openModal: true,
      };
    }

    case CLOSE_MODAL: {
      return {
        ...state,
        openModal: false,
        filteredEvent: "",
        eventId: 1,
      };
    }

    default:
      return state;
  }
}
