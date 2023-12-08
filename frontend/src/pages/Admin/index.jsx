import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

import { IconAdd } from "../../components/SvgIcons";
import style from "./admin.module.scss";

// TODO - addFeature - after save btn show saved and then return state before

export default function Admin() {
  const [newPhrase, setNewPhrase] = useState("");
  const [newAuthor, setNewAuthor] = useState(null);
  const [newEvent, setNewEvent] = useState(null);

  // console.log(
  //   "Phrase ==> ",
  //   newPhrase,
  //   "Author ==> ",
  //   newAuthor,
  //   "Event ==> ",
  //   newEvent
  // );

  const authorsData = useAxios({
    method: "get",
    endpoint: "authors",
  });

  const eventsData = useAxios({
    method: "get",
    endpoint: "events",
  });

  const handleNewPhrasePost = () => {
    if (newPhrase && newAuthor && newEvent) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/phrases`, {
          phrase: newPhrase,
          authorId: newAuthor,
        })
        .then((response) => {
          axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/api/eventPhrase`, {
              eventId: newEvent,
              phraseId: parseInt(response.data.insertId, 10),
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    }
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
      <div className={style.tablesDBButtons}>
        <Link to="/admin/tablesDb/phrases">
          <button className={style.buttons} type="button">
            Phrases
          </button>
        </Link>
        <Link to="/admin/tablesDb/events">
          <button className={style.buttons} type="button">
            Événement
          </button>
        </Link>
        <Link to="/admin/tablesDb/authors">
          <button className={style.buttons} type="button">
            Auteurs
          </button>
        </Link>
        <Link to="/admin/tablesDb/categories">
          <button className={style.buttons} type="button">
            Categories
          </button>
        </Link>
        <Link to="/admin/tablesDb/users">
          <button className={style.buttons} type="button">
            Utilisateurs
          </button>
        </Link>
      </div>
      <form className={style.form}>
        <label htmlFor="phrase" className={style.label}>
          Nouvelle Phrase
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
            <option defaultChecked>Auteur</option>
            {authorsData?.response?.map((author) => (
              <option key={author.id} value={author.id}>
                {author.known_name}
              </option>
            ))}
          </select>
          <Link to="/admin/newAuthor" className={style.link}>
            <button type="button" className={style.addAuthorBtn}>
              <IconAdd />
              <span className={style.addAuthorBtnDescription}>
                Ajouter author
              </span>
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
            <option defaultChecked>Événement</option>
            {eventsData?.response?.map((events) => (
              <option key={events.id} value={events.id}>
                {events.title}
              </option>
            ))}
          </select>
          <Link to="/admin/newEvent" className={style.link}>
            <button type="button" className={style.addEventBtn}>
              <IconAdd />
              <span className={style.addEventBtnDescription}>
                Ajouter événement
              </span>
            </button>
          </Link>
        </div>
        <div className={style.submitBtnContainer}>
          <button type="submit" className={style.submitBtn}>
            Sauvegarder nouvelle phrase
          </button>
        </div>
      </form>
    </div>
  );
}
