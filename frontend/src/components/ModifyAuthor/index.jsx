import propTypes from "prop-types";
import useAxios from "../../hooks/useAxios";

import style from "./modifyAuthor.module.scss";

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

  return (
    <div className={style.modifyAuthor}>
      <h2 className={style.title}>Modify Author</h2>
      <form className={style.modifyAuthorForm}>
        <label htmlFor="knownName" className={style.inputLabel}>
          Nom connu
          <input
            name="knownName"
            type="text"
            placeholder={selectedAuthorData.response?.known_name}
          />
        </label>
        <label htmlFor="firstName" className={style.inputLabel}>
          Prénom
          <input
            name="firstName"
            type="text"
            placeholder={selectedAuthorData.response?.first_name}
          />
        </label>
        <label htmlFor="lastName" className={style.inputLabel}>
          Nom
          <input
            name="lastName"
            type="text"
            placeholder={selectedAuthorData.response?.last_name}
          />
        </label>
        <label htmlFor="period" className={style.inputLabel}>
          Période
          <select name="period" id="period">
            {selectedAuthorData.response && (
              <option defaultChecked>
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
          <select name="philoCurrent" id="philoCurrent">
            {selectedAuthorData.response && (
              <option defaultChecked>
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
            <input type="date" name="bornDate" className={style.inputDates} />
          </label>
          <label htmlFor="deadDate" className={style.inputLabelDead}>
            Décédé
            <input type="date" name="deadDate" className={style.inputDates} />
          </label>
          <label htmlFor="era" className={style.inputLabelEra}>
            <span className={style.labelNameEra}>Era</span>
            <select name="era" id="" className={style.selectEra}>
              <option value="" disabled hidden>
                Sélectionne
              </option>
              <option value="BCE">BCE</option>
              <option value="CE">CE</option>
            </select>
          </label>
        </div>
        <div className={style.buttonsContainer}>
          <button type="button">Effacer</button>
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
  selectedAuthorId: propTypes.string.isRequired,
  setModifyAuthor: propTypes.func.isRequired,
};
