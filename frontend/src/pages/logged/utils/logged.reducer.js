export const SELECT_OPEN_MODAL = "openModalSelect";
export const INPUT_OPEN_MODAL = "openModalInput";
export const OPEN_MODAL = "openModal";
export const CLOSE_MODAL = "closeModal";

export default function loggedReducer(state, action) {
  switch (action.type) {
    case INPUT_OPEN_MODAL: {
      return {
        ...state,
        filteredCategory: action.payload.filteredCategory,
        categoryId: "",
      };
    }

    case SELECT_OPEN_MODAL: {
      return {
        ...state,
        categoryId: action.payload.categoryId,
        eventId: action.payload.eventId,
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
        filteredCategory: "",
        eventId: 1,
      };
    }

    default:
      return state;
  }
}
