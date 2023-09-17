import { useState } from "react";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

import style from "./newEvent.module.scss";

// TODO - Add feature newCategory

export default function NewEvent() {
  const [newEvent, setNewEvent] = useState("");
  const [newCategoryId, setNewCategory] = useState(null);

  const categoriesResponse = useAxios({
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
      <h1 className={style.title}>Add new event</h1>
      <form
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleNewEventPost();
        }}
      >
        <label htmlFor="title" className={style.label}>
          New event
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
            <option defaultChecked>Select a category</option>
            {categoriesResponse &&
              categoriesResponse.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
          </select>
        </label>
        <div className={style.submitBtnContainer}>
          <button type="submit" className={style.submitBtn}>
            Save the new event
          </button>
        </div>
      </form>
    </div>
  );
}
