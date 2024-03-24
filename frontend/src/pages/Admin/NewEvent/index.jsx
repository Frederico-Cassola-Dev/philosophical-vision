import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

import { IconAdd } from "../../../components/SvgIcons";
import DialogNotification from "../../../components/DialogNotification";

import style from "./newEvent.module.scss";

export default function NewEvent() {
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState("");
  const [newCategoryId, setNewCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const categoriesData = useAxios({
    method: "get",
    endpoint: "categories",
  });

  const handleNewEventPost = () => {
    if (newEvent && newCategoryId) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/events`, {
          title: newEvent,
          categoryId: newCategoryId,
        })
        .then(() => {
          setSubmitMessage("Nouveau événement ajouté");
          setIsDialogOpen(true);
          setNewEvent("");
          setNewCategory("");
        })
        .catch((err) => console.error(err));
    } else {
      setSubmitMessage("Remplissez et sélectionnez tous les champs");
      setIsDialogOpen(true);
    }
  };

  return (
    <div className={style.newEvent}>
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
          Nouveau Événement
          <input
            type="text"
            className={style.inputTitle}
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
          />
        </label>
        <label htmlFor="category" className={style.label}>
          Catégorie
          <div className={style.selectCategoriesContainer}>
            <select
              name="category"
              className={style.select}
              value={newCategoryId}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option defaultChecked>Sélectionne</option>
              {categoriesData?.response?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <Link to="/admin/newCategory" className={style.link}>
              <button type="button" className={style.addCategoryBtn}>
                <IconAdd />
                <span className={style.addCategoryBtnDescription}>
                  Ajouter Catégorie
                </span>
              </button>
            </Link>
          </div>
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
