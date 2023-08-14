import PropTypes from "prop-types";

import CloseIconModal from "./close-modal-button/CloseIcons";

export default function PageLoggedModal({ openModal, setOpenModal, data }) {
  if (!openModal) return null;

  return (
    <div className="overlay">
      <div className="content-container-modal">
        <CloseIconModal
          setOpenModal={setOpenModal}
          size="22"
          classStyle="close-icon-modal"
        />
        <h2>Events</h2>
        <div className="list-container">
          <ul>
            {data?.map((events) => (
              <li key={events.id}>{events.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

PageLoggedModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      map: PropTypes.func,
    })
  ),
};

PageLoggedModal.defaultProps = {
  data: [],
};
