import propTypes from "prop-types";
import useAxios from "../../hooks/useAxios";
import style from "./adminModifyModal.module.scss";

export default function AdminModifyModal({ selectedPhraseId }) {
  const selectedPhraseResponse = useAxios({
    method: "get",
    endpoint: `phrases/${selectedPhraseId}`,
  });

  return (
    <div className={style.modal}>
      <h2>Phrase to modify</h2>
      <form className={style.phraseContainer}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder={
              selectedPhraseResponse ? selectedPhraseResponse.phrase : ""
            }
          />
        </label>
        <label htmlFor="authors">
          Select an author
          <select name="authors" id="authors">
            <option defaultChecked>Select another author</option>
          </select>
        </label>
        <label htmlFor="likes">
          Reset Likes:{" "}
          {selectedPhraseResponse ? selectedPhraseResponse.likes : ""}
          <input type="checkbox" name="likes" id="likes" />
        </label>
        <button type="submit">Modify</button>
        <button type="button">Delete</button>
        <button type="button">Cancel</button>
      </form>
    </div>
  );
}
AdminModifyModal.propTypes = {
  selectedPhraseId: propTypes.number.isRequired,
};
