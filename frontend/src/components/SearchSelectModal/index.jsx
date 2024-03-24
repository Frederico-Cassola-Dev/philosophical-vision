import PropTypes from "prop-types";
import useAxios from "../../hooks/useAxios";
import {
  CLOSE_MODAL,
  SELECT_OPEN_MODAL,
} from "../../pages/Phrases/utils/phrases-reducer";

import CloseIconModal from "./CloseIconModal";
import style from "./searchSelectModal.module.scss";

export default function SearchSelectModal({ state, dispatch }) {
  const eventsByCategoryData = useAxios(
    {
      method: "get",
      endpoint: `events/categories/${
        state.categoryId ? state.categoryId : "1"
      }`,
    },

    [state.categoryId.length > 0 && state.filteredEvent === ""]
  );
  const eventsByTitleData = useAxios(
    {
      method: "get",
      endpoint: `events/search/${
        state.filteredEvent ? state.filteredEvent : "1"
      }`,
    },
    [state.filteredEvent.length > 2 && state.categoryId === ""]
  );

  return (
    <div className={style.overlay}>
      <div className={style.modalContainer}>
        <CloseIconModal
          size="22"
          classStyle={style.closeIconModal}
          state={state}
          dispatch={dispatch}
        />
        <h2 className={style.modalTitle}>Events</h2>
        <div className={style.listContainer}>
          <ul className={style.list}>
            {eventsByTitleData.response?.length === 0 &&
              state.categoryId === "" && (
                <li className={style.listItems}>
                  <button type="button" disabled>
                    Aucun résulta trouvé
                  </button>
                </li>
              )}
            {state.categoryId !== "" &&
              eventsByCategoryData?.response?.map((events) => (
                <li className={style.listItems} key={events.id}>
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
              eventsByTitleData?.response?.map((events) => (
                <li className={style.listItems} key={events.id}>
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
    eventId: PropTypes.number,
    filteredEvent: PropTypes.string,
    openModal: PropTypes.bool,
  }),
  dispatch: PropTypes.func.isRequired,
};

SearchSelectModal.defaultProps = {
  state: { categoryId: "", eventId: 1, filteredEvent: "", openModal: false },
};
