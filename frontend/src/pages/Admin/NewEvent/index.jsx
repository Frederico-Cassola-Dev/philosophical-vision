import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

import style from "./newEvent.module.scss";

export default function NewEvent() {
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState("");
  const [newCategoryId, setNewCategory] = useState(null);

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
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className={style.newEvent}>
      <h1 className={style.title}>Ajouter nouveau Événement</h1>
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
          <select
            name="category"
            className={style.select}
            onChange={(e) => setNewCategory(e.target.value)}
          >
            <option defaultChecked>Catégorie</option>
            {categoriesData?.response?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
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
            Retourné
          </button>
        </div>
      </form>
    </div>
  );
}
