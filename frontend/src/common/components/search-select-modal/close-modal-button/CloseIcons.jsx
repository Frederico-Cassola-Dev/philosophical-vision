import PropTypes from "prop-types";
import { CLOSE_MODAL } from "../../../../pages/logged/utils/logged-reducer";

export default function CloseIconModal({ dispatch, size, color, classStyle }) {
  return (
    <svg
      type="button"
      onClick={() => dispatch({ type: CLOSE_MODAL })}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
      className={`feather feather-x ${classStyle}`}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

CloseIconModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
  classStyle: PropTypes.string,
};

CloseIconModal.defaultProps = {
  size: "24",
  color: "currentColor",
  classStyle: "",
};
