import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DialogNotification from "../../../components/DialogNotification";

import style from "./newCategory.module.scss";

export default function NewCategory() {
  const navigate = useNavigate();
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleNewCategoryPost = () => {
    if (newCategoryTitle) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/categories`, {
          title: newCategoryTitle,
          description: newCategoryDescription,
        })
        .then(() => {
          setSubmitMessage("Nouvelle catégorie ajoutée");
          setIsDialogOpen(true);
          setNewCategoryTitle("");
          setNewCategoryDescription("");
        })
        .catch((err) => console.error(err));
    } else {
      setSubmitMessage("Remplissez et sélectionnez tous les champs");
      setIsDialogOpen(true);
    }
  };
  return (
    <div className={style.newCategory}>
      <h1 className={style.title}>Ajouter nouvelle catégorie</h1>
      {isDialogOpen && (
        <DialogNotification
          dialogContent={submitMessage}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
      <form
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleNewCategoryPost();
        }}
      >
        <label htmlFor="title" className={style.label}>
          Nouvelle catégorie
          <input
            name="title"
            id="title"
            type="text"
            className={style.input}
            placeholder="Insérez le titre de la catégorie"
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
          />
        </label>
        <label htmlFor="categoryDescription" className={style.label}>
          Description
          <textarea
            type="text"
            id="categoryDescription"
            name="categoryDescription"
            placeholder="Insérez la description de la catégorie"
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
          />
        </label>
        <div className={style.submitBtnContainer}>
          <button type="submit" className={style.submitBtn}>
            Sauvegarder
          </button>
          <button
            type="button"
            className={style.submitBtn}
            onClick={() => {
              navigate(-1);
            }}
          >
            Retourner
          </button>
        </div>
      </form>
    </div>
  );
}
