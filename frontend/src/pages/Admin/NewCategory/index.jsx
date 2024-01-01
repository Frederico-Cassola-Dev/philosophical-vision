import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DialogNotification from "../../../components/DialogNotification";

import style from "./newCategory.module.scss";

export default function NewCategory() {
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleNewEventPost = () => {
    if (newCategory) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/events`, {
          title: newCategory,
        })
        .then(() => {
          setSubmitMessage("Nouveau événement ajouté");
          setIsDialogOpen(true);
          setNewCategory("");
        })
        .catch((err) => console.error(err));
    } else {
      setSubmitMessage("Remplissez et sélectionnez tous les champs");
      setIsDialogOpen(true);
    }
  };
  return (
    <div className={style.newCategory}>
      <h1 className={style.title}>Ajouter nouveau Événement</h1>
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
          handleNewEventPost();
        }}
      >
        <label htmlFor="title" className={style.label}>
          Nouvelle Catégorie
          <input
            type="text"
            className={style.input}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </label>
        <div className={style.submitBtnContainer}>
          <button type="submit" className={style.submitBtn}>
            Sauvegarder
          </button>
          <button
            type="button"
            className={style.submitBtn}
            onClick={() => navigate("/admin")}
          >
            Retourner
          </button>
        </div>
      </form>
    </div>
  );
}
