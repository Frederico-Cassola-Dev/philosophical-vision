import { useState } from "react";
import propTypes from "prop-types";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import DialogNotification from "../DialogNotification";

import style from "./modifyCategory.module.scss";

export default function ModifyCategory({
  selectedCategoryId,
  setModifyCategory,
}) {
  const categoryData = useAxios(
    {
      method: "get",
      endpoint: `categories/${selectedCategoryId}`,
    },
    [selectedCategoryId]
  );

  const [modifiedCategoryTitle, setModifiedCategoryTitle] = useState("");
  const [modifiedCategoryDescription, setModifiedCategoryDescription] =
    useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmitCategoryForm = (e) => {
    e.preventDefault();

    axios
      .put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/categories/${selectedCategoryId}`,
        {
          title: modifiedCategoryTitle || categoryData.response.title,
          description:
            modifiedCategoryDescription || categoryData.response.description,
        }
      )
      .then(() => {
        setSubmitMessage("Catégorie modifié");
        setIsDialogOpen(true);
      })
      .catch((err) => console.error(err));
  };
  const handleDeleteCategory = (e) => {
    e.preventDefault();
    axios
      .delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/categories/${selectedCategoryId}`
      )
      .then(() => {
        setSubmitMessage("Catégorie effacée");
        setIsDialogOpen(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={style.modifyCategory}>
      <h2>Catégorie pour modifier</h2>
      {isDialogOpen && (
        <DialogNotification
          returnSetPreviousPage={setModifyCategory}
          dialogContent={submitMessage}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
      <form className={style.categoryForm} onSubmit={handleSubmitCategoryForm}>
        <label htmlFor="categoryTitle" className={style.label}>
          Titre
          <input
            type="text"
            name="categoryTitle"
            className={style.inputTitle}
            placeholder={
              categoryData?.response ? categoryData?.response?.title : ""
            }
            onChange={(e) => setModifiedCategoryTitle(e.target.value)}
          />
        </label>
        <label htmlFor="categoryTitle" className={style.label}>
          Description
          <textarea
            type="text"
            id="event"
            name="event"
            placeholder={
              categoryData?.response ? categoryData?.response?.description : ""
            }
            onChange={(e) => setModifiedCategoryDescription(e.target.value)}
          />
        </label>
        <div className={style.buttonsContainer}>
          <button type="button" onClick={handleDeleteCategory}>
            Effacer
          </button>
          <button type="submit">Modifier</button>
          <button
            type="button"
            onClick={() => {
              setModifyCategory(false);
            }}
          >
            Retourner
          </button>
        </div>
      </form>
    </div>
  );
}

ModifyCategory.propTypes = {
  selectedCategoryId: propTypes.number.isRequired,
  setModifyCategory: propTypes.func.isRequired,
};
