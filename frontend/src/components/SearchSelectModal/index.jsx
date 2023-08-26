import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";
import {
  CLOSE_MODAL,
  SELECT_OPEN_MODAL,
} from "../../pages/Phrases/utils/phrases-reducer";
import CloseIconModal from "./CloseIconModal";

export default function SearchSelectModal({ state, dispatch }) {
  const eventsByCategoryResponse = useAxios({
    method: "get",
    endpoint: `events/categories/${state.categoryId}`,
  });

  const eventsByTitleResponse = useAxios({
    method: "get",
    endpoint: `events/${state.filteredEvent}`,
  });

  return (
    <div className="overlay">
      <div className="modal-container">
        <CloseIconModal
          size="22"
          classStyle="close-icon-modal"
          state={state}
          dispatch={dispatch}
        />
        <h2 className="modal-title">Events</h2>
        <div className="list-container">
          <ul className="list">
            {state.categoryId !== "" &&
              eventsByCategoryResponse?.map((events) => (
                <li className="list-items" key={events.id}>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch({ type: CLOSE_MODAL });
                      dispatch({
                        type: SELECT_OPEN_MODAL,
                        payload: {
                          categoryId: state.categoryId,
                          eventId: events.id,
                        },
                      });
                    }}
                  >
                    {events.title}
                  </button>
                </li>
              ))}
            {state.filteredEvent !== "" &&
              eventsByTitleResponse?.map((events) => (
                <li className="list-items" key={events.id}>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch({ type: CLOSE_MODAL });
                      dispatch({
                        type: SELECT_OPEN_MODAL,
                        payload: {
                          categoryId: state.categoryId,
                          eventId: events.id,
                        },
                      });
                    }}
                  >
                    {events.title}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

SearchSelectModal.propTypes = {
  state: PropTypes.shape({
    categoryId: PropTypes.string,
    eventId: PropTypes.string,
    filteredEvent: PropTypes.string,
    openModal: PropTypes.bool,
  }),
  dispatch: PropTypes.func.isRequired,
};

SearchSelectModal.defaultProps = {
  state: { categoryId: "", eventId: "", filteredEvent: "", openModal: false },
};