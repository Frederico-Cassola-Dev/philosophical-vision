import PropTypes from "prop-types";

import CloseIconModal from "./close-modal-button/CloseIcons";

export default function SearchSelectModal({ openModal, setOpenModal, data }) {
  if (!openModal) return null;

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
            {data?.map((events) => (
              <li className="list-items" key={events.id}>
                {events.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

SearchSelectModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func,
    })
  ),
};

SearchSelectModal.defaultProps = {
  data: [],
};
