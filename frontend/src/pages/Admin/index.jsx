import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

import { IconAdd } from "../../components/SvgIcons";
import style from "./_admin.module.scss";

export default function Admin() {
  const [newPhrase, setNewPhrase] = useState("");
  const [newAuthor, setNewAuthor] = useState(null);
  const [newEvent, setNewEvent] = useState(null);

  const authorsResponse = useAxios({
    method: "get",
    endpoint: "authors",
  });
  const eventsResponse = useAxios({
    method: "get",
    endpoint: "events",
  });

  const handleNewPhrasePost = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/phrases`, {
        phrase: newPhrase,
        authorId: newAuthor,
      })
      .then((response) => {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/api/eventphrase`, {
            eventId: newEvent,
            phraseId: parseInt(response.data.insertId, 10),
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className={style.admin}
      onSubmit={(e) => {
        e.preventDefault();
        handleNewPhrasePost();
      }}
    >
      <h1 className={style.adminTitle}>Administration</h1>
      <form className={style.form}>
        <label htmlFor="phrase" className={style.label}>
          New Phrase
          <input
            type="text"
            className={style.input}
            id="phrase"
            value={newPhrase}
            onChange={(e) => setNewPhrase(e.target.value)}
          />
        </label>
        <div className={style.selectAuthorsContainer}>
          <select
            name="listAuthors"
            id="author"
            className={style.select}
            onChange={(e) => setNewAuthor(e.target.value)}
          >
            <option defaultChecked>Select an Author</option>
            {authorsResponse &&
              authorsResponse.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.known_name}
                </option>
              ))}
          </select>
          <Link to="/admin/newauthor">
            <button type="button" className={style.addAuthorBtn}>
              <IconAdd />
              <span className={style.addAuthorBtnDescription}>Add author</span>
            </button>
          </Link>
        </div>
        <div className={style.selectEventsContainer}>
          <select
            name="listEvents"
            id="events"
            className={style.select}
            onChange={(e) => setNewEvent(e.target.value)}
          >
            <option defaultChecked>Select the event</option>
            {eventsResponse &&
              eventsResponse.map((events) => (
                <option key={events.id} value={events.id}>
                  {events.title}
                </option>
              ))}
          </select>
          <button type="button" className={style.addEventBtn}>
            <IconAdd />
            <span className={style.addEventBtnDescription}>Add event</span>
          </button>
        </div>
        <div className={style.submitBtnContainer}>
          <button type="submit" className={style.submitBtn}>
            Save the new phrase
          </button>
        </div>
      </form>
    </div>
  );
}
