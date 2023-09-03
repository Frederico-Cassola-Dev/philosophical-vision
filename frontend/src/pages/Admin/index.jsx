import { IconAdd } from "../../components/SvgIcons";

import style from "./_admin.module.scss";

export default function Admin() {
  return (
    <div className={style.admin}>
      <h1 className={style.adminTitle}>Administration</h1>
      <form className={style.form}>
        <label htmlFor="phrase" className={style.label}>
          New Phrase
          <input type="text" id="phrase" className={style.input} />
        </label>
        <div className={style.selectContainer}>
          <select name="listAuthors" id="author" className={style.select}>
            <option defaultChecked>Select an Author</option>
            <option>Socrates</option>
            <option>Descartes</option>
            <option>Platon</option>
            <option>Spinoza</option>
          </select>
          <button type="button" className={style.addAuthorBtn}>
            <IconAdd />
          </button>
        </div>
      </form>
    </div>
  );
}
