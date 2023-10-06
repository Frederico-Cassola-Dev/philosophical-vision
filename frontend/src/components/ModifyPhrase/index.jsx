import { useState } from "react";
import propTypes from "prop-types";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import { DeleteIcon } from "../SvgIcons";

import style from "./modifyPhrase.module.scss";

const getSelectedPhraseAuthorAndEvent = (selectedPhraseId) => {
  const selectedPhraseResponse = useAxios({
    method: "get",
    endpoint: `eventphrase/${selectedPhraseId}`,
  });

  const authorsResponse = useAxios({
    method: "get",
    endpoint: "authors",
  });

  const eventsResponse = useAxios({
    method: "get",
    endpoint: "events",
  });

  return { selectedPhraseResponse, authorsResponse, eventsResponse };
};

export default function ModifyPhrase({ selectedPhraseId, setModifyPhrase }) {
  const { selectedPhraseResponse, authorsResponse, eventsResponse } =
    getSelectedPhraseAuthorAndEvent(selectedPhraseId);

  const [modifiedPhrase, setModifiedPhrase] = useState("");
  const [modifiedAuthor, setModifiedAuthor] = useState("");
  const [modifiedEvent, setModifiedEvent] = useState("");
  const [modifiedLikes, setModifiedLikes] = useState("");

  // TODO - Event update not working correctly. One phrase have more then one event.
  const handleSubmitModifyPhrase = () => {
    // e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/phrases/${selectedPhraseId}`,
        {
          phrase: modifiedPhrase || selectedPhraseResponse.phrase,
          author_id: modifiedAuthor || selectedPhraseResponse.author_id,
          event_id: modifiedEvent || selectedPhraseResponse.event_id,
          likes:
            modifiedLikes !== "" ? modifiedLikes : selectedPhraseResponse.likes,
        }
      )
      .then((response) => console.info(response.status))
      .catch((err) => console.error(err));
  };

  const handleSubmitDeletePhrase = (e) => {
    e.preventDefault();
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/phrases/${selectedPhraseId}`
      )
      .then((response) => console.info(response.status))
      .catch((err) => console.error(err));
  };

  return (
    <div className={style.modal}>
      <h2>Phrase to modify</h2>
      <form className={style.phraseForm} onSubmit={handleSubmitModifyPhrase}>
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
          Author
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
          <h3 className={style.title}>Events</h3>
          <div className={style.events}>
            {selectedPhraseResponse?.events_titles.map((item) => (
              <div key={item} className={style.singleEventContainer}>
                <p>{item}</p>
                <button type="button" className={style.deleteButtons}>
                  <DeleteIcon />
                </button>
              </div>
            ))}
          </div>
          <label htmlFor="listEvents" className={style.labelSelectEvents}>
            <select
              name="listEvents"
              id="listEvents"
              className={`${style.select} ${style.listEvents}`}
              onChange={(e) => setModifiedEvent(e.target.value)}
            >
              <option defaultChecked>Add a new event</option>
              {eventsResponse &&
                eventsResponse.map((events) => (
                  <option key={events.id} value={events.id}>
                    {events.title}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <label htmlFor="likes" className={style.labelLikes}>
          Total likes :{" "}
          {modifiedLikes !== 0 && selectedPhraseResponse
            ? selectedPhraseResponse.likes
            : modifiedLikes}{" "}
          - Reset
          <input
            type="checkbox"
            name="likes"
            id="likes"
            onChange={(e) => {
              if (e.target.checked) {
                setModifiedLikes(0);
              } else {
                setModifiedLikes(selectedPhraseResponse.likes);
              }
            }}
          />
        </label>
        <div className={style.buttonsContainer}>
          <button type="button" onClick={handleSubmitDeletePhrase}>
            Delete
          </button>
          <button type="submit">Modify</button>
          <button
            type="button"
            onClick={() => {
              setModifyPhrase(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
ModifyPhrase.propTypes = {
  selectedPhraseId: propTypes.number.isRequired,
  setModifyPhrase: propTypes.func.isRequired,
};
