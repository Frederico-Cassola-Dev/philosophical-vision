import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";
import {
  CLOSE_MODAL,
  SELECT_OPEN_MODAL,
} from "../../../pages/logged/utils/logged.reducer";

import CloseIconModal from "./close-modal-button/CloseIcons";

export default function SearchSelectModal({ dispatch, state }) {
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
          dispatch={dispatch}
          size="22"
          classStyle="close-icon-modal"
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
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.shape({
    categoryId: PropTypes.string,
    eventId: PropTypes.number,
    filteredEvent: PropTypes.string,
    openModal: PropTypes.bool,
  }).isRequired,
  // setChosenEventId: PropTypes.func.isRequired,
  // data: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     map: PropTypes.func,
  //   })
  // ),
  // chosenCategoryId: PropTypes.string.isRequired,
};

SearchSelectModal.defaultProps = {
  // data: [],
};
