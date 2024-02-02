import { useState } from "react";
import propTypes from "prop-types";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

import style from "./modifyAuthor.module.scss";
import DialogNotification from "../DialogNotification";

export default function ModifyAuthor({ selectedAuthorId, setModifyAuthor }) {
  const selectedAuthorData = useAxios(
    {
      method: "get",
      endpoint: `authors/${selectedAuthorId}`,
    },
    [selectedAuthorId]
  );

  const periodData = useAxios(
    {
      method: "get",
      endpoint: "periods",
    },
    [selectedAuthorId]
  );
  const philoCurrentData = useAxios(
    {
      method: "get",
      endpoint: "philoCurrents",
    },
    [selectedAuthorId]
  );
  const [newKnownName, setNewKnownName] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPeriod, setNewPeriod] = useState("");
  const [newPhiloCurrent, setNewPhiloCurrent] = useState("");
  const [newBornDate, setNewBornDate] = useState("");
  const [newDeadDate, setNewDeadDate] = useState("");
  const [newEra, setNewEra] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmitModifiedAuthor = (event) => {
    event.preventDefault();

    const newModifiedAuthor = {
      newKnownName: newKnownName || selectedAuthorData.response?.known_name,
      newFirstName: newFirstName || selectedAuthorData.response?.first_name,
      newLastName: newLastName || selectedAuthorData.response?.last_name,
      newPeriod: newPeriod || selectedAuthorData.response?.period_id,
      newPhiloCurrent:
        newPhiloCurrent || selectedAuthorData.response?.philo_current_id,
      newBornDate: newBornDate || selectedAuthorData.response?.born_date,
      newDeadDate: newDeadDate || selectedAuthorData.response?.dead_date,
      newEra: newEra || selectedAuthorData.response?.era,
    };

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/authors/${selectedAuthorId}`,
        { newModifiedAuthor }
      )
      .then(() => {
        setSubmitMessage("Auteur modifié");
        setIsDialogOpen(true);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmitDeleteAuthor = (event) => {
    event.preventDefault();
    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/authors/${selectedAuthorId}`
      )
      .then(() => {
        setSubmitMessage("Auteur effacé");
        setIsDialogOpen(true);
      })
      .catch((err) => {
        if (err) {
          setSubmitMessage("Auteur déjà utilisé, impossible de effacer");
          setIsDialogOpen(true);
        }
        console.error(err);
      });
  };

  return (
    <div className={style.modifyAuthor}>
      <h2 className={style.title}>Modify Author</h2>
      {isDialogOpen && (
        <DialogNotification
          returnSetPreviousPage={setModifyAuthor}
          dialogContent={submitMessage}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
      <form
        className={style.modifyAuthorForm}
        onSubmit={handleSubmitModifiedAuthor}
      >
        <label htmlFor="knownName" className={style.inputLabel}>
          Nom connu
          <input
            name="knownName"
            id="knownName"
            type="text"
            placeholder={selectedAuthorData.response?.known_name}
            defaultValue={newKnownName}
            onChange={(e) => setNewKnownName(e.target.value)}
          />
        </label>
        <label htmlFor="firstName" className={style.inputLabel}>
          Prénom
          <input
            name="firstName"
            id="firstName"
            type="text"
            placeholder={selectedAuthorData.response?.first_name}
            defaultValue={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
        </label>
        <label htmlFor="lastName" className={style.inputLabel}>
          Nom
          <input
            name="lastName"
            id="lastName"
            type="text"
            placeholder={selectedAuthorData.response?.last_name}
            defaultValue={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
        </label>
        <label htmlFor="period" className={style.inputLabel}>
          Période
          <select
            name="period"
            id="period"
            value={newPeriod}
            onChange={(e) => setNewPeriod(e.target.value)}
          >
            {selectedAuthorData.response && (
              <option defaultChecked hidden>
                {selectedAuthorData.response?.period_title}
              </option>
            )}
            {periodData.response?.map((item) => (
              <option value={item.id} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="philoCurrent" className={style.inputLabel}>
          Courant Philosophique
          <select
            name="philoCurrent"
            id="philoCurrent"
            value={newPhiloCurrent}
            onChange={(e) => setNewPhiloCurrent(e.target.value)}
          >
            {selectedAuthorData.response && (
              <option defaultChecked hidden>
                {selectedAuthorData.response?.philo_current_title}
              </option>
            )}
            {philoCurrentData.response?.map((item) => (
              <option value={item.id} key={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <div className={style.datesContainer}>
          <label htmlFor="bornDate" className={style.inputLabelBorn}>
            Né
            <input
              type="date"
              name="bornDate"
              id="bornDate"
              className={style.inputDates}
              defaultValue={
                newBornDate || selectedAuthorData.response?.born_date
              }
              onChange={(e) => setNewBornDate(e.target.value)}
            />
          </label>
          <label htmlFor="deadDate" className={style.inputLabelDead}>
            Décédé
            <input
              type="date"
              name="deadDate"
              id="deadDate"
              className={style.inputDates}
              defaultValue={
                newDeadDate || selectedAuthorData.response?.dead_date
              }
              onChange={(e) => setNewDeadDate(e.target.value)}
            />
          </label>
          <label htmlFor="era" className={style.inputLabelEra}>
            <span className={style.labelNameEra}>Era</span>
            <select
              name="era"
              id="era"
              className={style.selectEra}
              value={newEra || selectedAuthorData.response?.era}
              onChange={(e) => setNewEra(e.target.value)}
            >
              {selectedAuthorData.response && (
                <option
                  defaultChecked
                  hidden
                  value={newEra || selectedAuthorData.response?.era}
                >
                  {newEra || selectedAuthorData.response?.era}
                </option>
              )}
              <option
                value={
                  newEra === "BCE" || selectedAuthorData.response?.era === "BCE"
                    ? "CE"
                    : "BCE"
                }
              >
                {newEra === "BCE" || selectedAuthorData.response?.era === "BCE"
                  ? "CE"
                  : "BCE"}
              </option>
            </select>
          </label>
        </div>
        <div className={style.buttonsContainer}>
          <button type="button" onClick={handleSubmitDeleteAuthor}>
            Effacer
          </button>
          <button type="submit">Modifier</button>
          <button
            type="button"
            onClick={() => {
              setModifyAuthor(false);
            }}
          >
            Retourner
          </button>
        </div>
      </form>
    </div>
  );
}

ModifyAuthor.propTypes = {
  selectedAuthorId: propTypes.number.isRequired,
  setModifyAuthor: propTypes.func.isRequired,
};
