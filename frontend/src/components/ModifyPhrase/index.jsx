import { useEffect, useState } from "react";
import propTypes from "prop-types";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { DeleteIcon, IconAdd } from "../SvgIcons";

import style from "./modifyPhrase.module.scss";

const getSelectedPhraseAuthorAndEvent = (
  selectedPhraseId,
  dependenciesToUpdateTable = []
) => {
  const selectedPhraseResponse = useAxios(
    {
      method: "get",
      endpoint: `eventphrase/${selectedPhraseId}`,
    },
    dependenciesToUpdateTable
  );

  const authorsResponse = useAxios(
    {
      method: "get",
      endpoint: "authors",
    },
    dependenciesToUpdateTable
  );

  const eventsResponse = useAxios(
    {
      method: "get",
      endpoint: "events",
    },
    dependenciesToUpdateTable
  );

  return { selectedPhraseResponse, authorsResponse, eventsResponse };
};

const eventsNotAlreadySelectedInSelectedPhrase = (
  events,
  alreadySelectedEvents
) => {
  const finalResult = events?.filter(
    (item) => !alreadySelectedEvents?.includes(item.id)
  );

  return finalResult;
};

export default function ModifyPhrase({
  selectedPhraseId,
  setModifyPhrase,
  updateTable,
}) {
  const { selectedPhraseResponse, authorsResponse, eventsResponse } =
    getSelectedPhraseAuthorAndEvent(selectedPhraseId, [
      selectedPhraseId,
      updateTable,
    ]);

  const [modifiedPhrase, setModifiedPhrase] = useState("");
  const [modifiedAuthor, setModifiedAuthor] = useState("");
  const [modifiedEvent, setModifiedEvent] = useState("");
  const [modifiedLikes, setModifiedLikes] = useState(false);
  const [eventsListIdToModify, setEventsListIdToModify] = useState([]);

  useEffect(() => {
    setEventsListIdToModify(selectedPhraseResponse?.events_id);
  }, [selectedPhraseId, selectedPhraseResponse]);

  // TODO - Bug when scrolling table in the top of the tableBody - CSS.
  // TODO - Delete event on formData obj - DONE.
  // TODO - PUT events array from formData obj - DONE.
  // TODO - PUT phrase from formData obj. - DONE
  // TODO - PUT author from formData obj. - DONE
  // TODO - PUT likes from formData obj. - DONE -NEED CONFIRMATION
  // TODO - Confirm the PUT if the same number of events. - DONE

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const newModifiedPhrase = {
      phrase: modifiedPhrase || selectedPhraseResponse.phrase,
      author_id: modifiedAuthor || selectedPhraseResponse.author_id,
      events: eventsListIdToModify || selectedPhraseResponse.events_titles,
      likes: modifiedLikes ? 0 : selectedPhraseResponse.likes,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/phrases/${selectedPhraseId}`,
        newModifiedPhrase
      )
      .catch((err) => console.error(err));
  };

  const handleSubmitDeletePhrase = (e) => {
    e.preventDefault();
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/phrases/${selectedPhraseId}`
      )
      .catch((err) => console.error(err));
  };

  const handleAddEventFromListToFormData = () => {
    if (
      Number(modifiedEvent) &&
      !eventsListIdToModify.includes(modifiedEvent)
    ) {
      const modifiedEventAsNumber = parseInt(modifiedEvent, 10);
      setEventsListIdToModify((previousState) => [
        ...previousState,
        modifiedEventAsNumber,
      ]);
    }
  };

  const handleDeleteEventFromListToFormData = (eventToDelete) => {
    if (eventsListIdToModify.includes(eventToDelete)) {
      setEventsListIdToModify((previousState) =>
        previousState.filter((item) => item !== eventToDelete)
      );
    }
  };

  return (
    <div className={style.modal}>
      <h2>Phrase to modifiée</h2>
      <form className={style.phraseForm} onSubmit={handleSubmitForm}>
        <label htmlFor="phrase">
          <textarea
            type="text"
            id="phrase"
            name="phrase"
            placeholder={
              selectedPhraseResponse ? selectedPhraseResponse.phrase : ""
            }
            onChange={(e) => setModifiedPhrase(e.target.value)}
          />
        </label>
        <label htmlFor="listAuthors">
          Auteur
          <select
            name="listAuthors"
            id="listAuthors"
            className={style.select}
            onChange={(e) => setModifiedAuthor(e.target.value)}
          >
            {authorsResponse && (
              <option defaultChecked>
                {selectedPhraseResponse && selectedPhraseResponse.author}
              </option>
            )}
            {authorsResponse &&
              authorsResponse.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.known_name}
                </option>
              ))}
          </select>
        </label>
        <div className={style.eventsContainer}>
          <h3 className={style.title}>Événements</h3>
          <div className={style.events}>
            {eventsListIdToModify?.map((item) => {
              if (item) {
                const eventToShow = eventsResponse?.find(
                  (itemToShow) => itemToShow.id === item
                );
                return (
                  <div key={item} className={style.singleEventContainer}>
                    <p>{eventToShow?.title}</p>
                    <button
                      type="button"
                      className={style.deleteButtons}
                      onClick={() => handleDeleteEventFromListToFormData(item)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <label htmlFor="listEvents" className={style.labelSelectEvents}>
            <select
              name="listEvents"
              id="listEvents"
              className={`${style.select} ${style.listEvents}`}
              value={modifiedEvent}
              onChange={(e) => setModifiedEvent(e.target.value)}
            >
              <option defaultChecked>Ajouter un nouveau événement</option>
              {eventsResponse &&
                eventsNotAlreadySelectedInSelectedPhrase(
                  eventsResponse,
                  eventsListIdToModify
                ).map((events) => (
                  <option key={events.id} value={events.id}>
                    {events.title}
                  </option>
                ))}
            </select>
            <button
              type="button"
              className={style.addEventBtn}
              onClick={handleAddEventFromListToFormData}
            >
              <IconAdd />
            </button>
          </label>
        </div>
        <label htmlFor="likes" className={style.labelLikes}>
          Totale likes : {modifiedLikes ? 0 : selectedPhraseResponse?.likes} -
          Reset
          <input
            type="checkbox"
            name="likes"
            id="likes"
            value={modifiedLikes}
            onChange={(e) => {
              if (e.target.checked) {
                setModifiedLikes(true);
              } else {
                setModifiedLikes(false);
              }
            }}
          />
        </label>
        <div className={style.buttonsContainer}>
          <button type="button" onClick={handleSubmitDeletePhrase}>
            Effacer
          </button>
          <button type="submit">Modifier</button>
          <button
            type="button"
            onClick={() => {
              setModifyPhrase(false);
            }}
          >
            Fermé
          </button>
        </div>
      </form>
    </div>
  );
}

ModifyPhrase.propTypes = {
  selectedPhraseId: propTypes.number.isRequired,
  setModifyPhrase: propTypes.func.isRequired,
  updateTable: propTypes.bool.isRequired,
};
