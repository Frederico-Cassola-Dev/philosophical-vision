import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

import CloseIconModal from "./close-modal-button/CloseIcons";

export default function SearchSelectModal({
  setOpenModal,
  chosenCategoryId,
  setChosenEventId,
}) {
  const eventsByCategoryResponse = useAxios({
    method: "get",
    endpoint: `events/categories/${chosenCategoryId}`,
  });

  return (
    <div className="overlay">
      <div className="modal-container">
        <CloseIconModal
          setOpenModal={setOpenModal}
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
                    setOpenModal(false);
                    setChosenEventId(events.id);
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
  setOpenModal: PropTypes.func.isRequired,
  setChosenEventId: PropTypes.func.isRequired,
  // data: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     map: PropTypes.func,
  //   })
  // ),
  chosenCategoryId: PropTypes.string.isRequired,
};

SearchSelectModal.defaultProps = {
  // data: [],
};
