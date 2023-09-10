import style from "./_newAuthor.module.scss";

export default function NewAuthor() {
  return (
    <div className={style.newAuthor}>
      <h1 className={style.title}>Add new author</h1>
      <form className={style.form}>
        <label htmlFor="knownName" className={style.inputLabel}>
          Known name
          <input type="text" name="knownName" className={style.input} />
        </label>
        <label htmlFor="firstName" className={style.inputLabel}>
          First name
          <input type="text" name="firstName" className={style.input} />
        </label>
        <label htmlFor="lastName" className={style.inputLabel}>
          Last name
          <input type="text" name="lastName" className={style.input} />
        </label>
        <label htmlFor="period" className={style.inputLabel}>
          Period
          <select name="era" id="" className={style.select}>
            <option defaultChecked>Select the era</option>
            <option value="BCE">Before Common Era</option>
            <option value="CE">Common Era</option>
          </select>
        </label>
        <label htmlFor="philoCurrent" className={style.inputLabel}>
          Philosophical current
          <select name="era" id="" className={style.select}>
            <option defaultChecked>Select the era</option>
            <option value="BCE">Before Common Era</option>
            <option value="CE">Common Era</option>
          </select>
        </label>
        <div className={style.datesContainer}>
          <label htmlFor="bornDate" className={style.inputLabelBorn}>
            Born date
            <input type="number" name="bornDate" className={style.inputDates} />
          </label>
          <label htmlFor="deadDate" className={style.inputLabelDead}>
            Dead Date
            <input type="number" name="deadDate" className={style.inputDates} />
          </label>
          <label htmlFor="era" className={style.inputLabelEra}>
            <span className={style.labelNameEra}>Era</span>
            <select name="era" id="" className={style.selectEra}>
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
