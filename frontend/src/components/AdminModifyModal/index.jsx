import { useState } from "react";
import propTypes from "prop-types";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

import style from "./adminModifyModal.module.scss";

const getSelectedPhraseAuthorAndEvent = (selectedPhraseId) => {
  const selectedPhraseResponse = useAxios({
    method: "get",
    endpoint: `phrases/${selectedPhraseId}`,
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
export default function AdminModifyModal({ selectedPhraseId, setModifyModal }) {
  const { selectedPhraseResponse, authorsResponse, eventsResponse } =
    getSelectedPhraseAuthorAndEvent(selectedPhraseId);

  const [modifiedPhrase, setModifiedPhrase] = useState("");
  const [modifiedAuthor, setModifiedAuthor] = useState("");
  const [modifiedEvent, setModifiedEvent] = useState("");
  const [modifiedLikes, setModifiedLikes] = useState("");

  const handleSubmitModifyPhrase = (e) => {
    e.preventDefault();
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/phrases/${selectedPhraseId}`,
        {
          phrase: modifiedPhrase || selectedPhraseResponse.phrase,
          authors_id: modifiedAuthor || selectedPhraseResponse.authors_id,
          events_id: modifiedEvent || selectedPhraseResponse.event_id,
          likes: modifiedLikes || selectedPhraseResponse.likes,
        }
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
        <label htmlFor="listEvents">
          <select
            name="listEvents"
            id="listEvents"
            className={`${style.select} ${style.listEvents}`}
            onChange={(e) => setModifiedEvent(e.target.value)}
          >
            <option defaultChecked>
              {selectedPhraseResponse && selectedPhraseResponse.event_title}
            </option>
            {eventsResponse &&
              eventsResponse.map((events) => (
                <option key={events.id} value={events.id}>
                  {events.title}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="likes" className={style.labelLikes}>
          Reset Likes:{" "}
          {selectedPhraseResponse ? selectedPhraseResponse.likes : ""}
          <input
            type="checkbox"
            name="likes"
            id="likes"
            onChange={(e) => setModifiedLikes(e.target.value)}
          />
        </label>
        <div className={style.buttonsContainer}>
          <button type="button">Delete</button>
          <button type="submit">Modify</button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setModifyModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
AdminModifyModal.propTypes = {
  selectedPhraseId: propTypes.number.isRequired,
  setModifyModal: propTypes.func.isRequired,
};
