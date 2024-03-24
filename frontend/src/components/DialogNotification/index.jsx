import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import style from "./dialogNotification.module.scss";

export default function DialogNotification({
  dialogContent,
  setIsDialogOpen,
  returnSetPreviousPage = () => {},
}) {
  const autoFocusRef = useRef(null);

  useEffect(() => {
    autoFocusRef.current.focus();
  }, []);

  return (
    <div className={style.dialogOverlay}>
      <dialog open className={style.customDialog}>
        <p className={style.dialogContent}>{dialogContent}</p>
        <button
          type="button"
          className={style.dialogCloseButton}
          onClick={() => {
            setIsDialogOpen(false);
            returnSetPreviousPage(false);
          }}
          ref={autoFocusRef}
        >
          Retourner
        </button>
      </dialog>
    </div>
  );
}

DialogNotification.propTypes = {
  returnSetPreviousPage: PropTypes.func,
  dialogContent: PropTypes.string.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
};

DialogNotification.defaultProps = {
  returnSetPreviousPage: () => {},
};
