import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

import CloseIconModal from "./close-modal-button/CloseIcons";

export default function SearchSelectModal({ dispatch, state }) {
  const eventsByCategoryResponse = useAxios({
    method: "get",
    endpoint: `events/categories/${state.categoryId}`,
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
            {eventsByCategoryResponse?.map((events) => (
              <li className="list-items" key={events.id}>
                <button
                  type="button"
                  onClick={() => {
                    dispatch({
                      type: "openModalSelect",

                      payload: {
                        openModal: false,
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
    eventId: PropTypes.string,
    filteredCategory: PropTypes.string,
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
