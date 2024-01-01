import PropTypes from "prop-types";

import style from "./dialogNotification.module.scss";

export default function DialogNotification({ dialogContent, setIsDialogOpen }) {
  return (
    <div className={style.dialogOverlay}>
      <dialog open className={style.customDialog}>
        <p className={style.dialogContent}>{dialogContent}</p>
        <button
          type="button"
          className={style.dialogCloseButton}
          onClick={() => setIsDialogOpen(false)}
        >
          Retourner
        </button>
      </dialog>
    </div>
  );
}

DialogNotification.propTypes = {
  dialogContent: PropTypes.string.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
};
