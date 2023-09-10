import { useState } from "react";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";
import style from "./_newAuthor.module.scss";

export default function NewAuthor() {
  const [knownName, setKnownName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [periodId, setPeriodId] = useState(null);
  const [philoCurrent, setPhiloCurrent] = useState(null);
  const [bornDate, setBornDate] = useState("");
  const [deadDate, setDeadDate] = useState("");
  const [era, setEra] = useState("");

  const periodsResponse = useAxios({
    method: "get",
    endpoint: "periods",
  });

  const handleNewAuthorPost = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/authors`, {
        knownName,
        firstName,
        lastName,
        periodId,
        philoCurrent,
        bornDate,
        deadDate,
        era,
      })
      .then((response) => console.info(response))
      .catch((err) => console.error(err));
  };

  return (
    <div className={style.newAuthor}>
      <h1 className={style.title}>Add new author</h1>
      <form
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleNewAuthorPost();
        }}
      >
        <label htmlFor="knownName" className={style.inputLabel}>
          Known name
          <input
            type="text"
            name="knownName"
            className={style.input}
            onChange={(e) => setKnownName(e.target.value)}
          />
        </label>
        <label htmlFor="firstName" className={style.inputLabel}>
          First name
          <input
            type="text"
            name="firstName"
            className={style.input}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label htmlFor="lastName" className={style.inputLabel}>
          Last name
          <input
            type="text"
            name="lastName"
            className={style.input}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label htmlFor="periodId" className={style.inputLabel}>
          periodId
          <select
            name="periodId"
            id=""
            className={style.select}
            onChange={(e) => setPeriodId(e.target.value)}
          >
            <option defaultChecked>Select the periodId</option>
            {periodsResponse &&
              periodsResponse.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="philoCurrent" className={style.inputLabel}>
          Philosophical current
          <select
            name="era"
            id=""
            className={style.select}
            onChange={(e) => setPhiloCurrent(e.target.value)}
          >
            <option defaultChecked>Select the periodId</option>
            <option value="1">Socratic</option>
            <option value="2">Illuminism</option>
          </select>
        </label>
        <div className={style.datesContainer}>
          <label htmlFor="bornDate" className={style.inputLabelBorn}>
            Born date
            <input
              type="date"
              name="bornDate"
              className={style.inputDates}
              onChange={(e) => setBornDate(e.target.value)}
            />
          </label>
          <label htmlFor="deadDate" className={style.inputLabelDead}>
            Dead Date
            <input
              type="date"
              name="deadDate"
              className={style.inputDates}
              onChange={(e) => setDeadDate(e.target.value)}
            />
          </label>
          <label htmlFor="era" className={style.inputLabelEra}>
            <span className={style.labelNameEra}>Era</span>
            <select
              name="era"
              id=""
              className={style.selectEra}
              onChange={(e) => setEra(e.target.value)}
            >
              <option value="BCE">BCE</option>
              <option value="CE">CE</option>
            </select>
          </label>
        </div>
        <div className={style.submitBtnContainer}>
          <button type="submit" className={style.submitBtn}>
            Save the new author
          </button>
        </div>
      </form>
    </div>
  );
}
