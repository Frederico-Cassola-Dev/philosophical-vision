import { useState } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

import style from "./modifyEvent.module.scss";
import { IconAdd } from "../SvgIcons";

export default function ModifyEvent({ selectedEventId, setModifyEvent }) {
  // console.log("🚀 - selectedEventId:", selectedEventId);
  const eventData = useAxios(
    {
      method: "get",
      endpoint: `events/${selectedEventId}`,
    },
    [selectedEventId]
  );

  const categoriesData = useAxios(
    {
      method: "get",
      endpoint: "categories",
    },
    [selectedEventId]
  );
  // console.log("🚀 - categoriesData:", categoriesData)

  // console.log("🚀 - eventsData:", eventData.response);
  const [modifiedEvent, setModifiedEvent] = useState("");
  const [modifiedCategory, setModifiedCategory] = useState("");
  // console.log("🚀 - modifiedCategory:", modifiedCategory);

  const handleSubmitEventForm = (e) => {
    e.preventDefault();

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/${selectedEventId}`,
        {
          title: modifiedEvent || eventData.response.title,
          category: modifiedCategory || eventData.response.category_id,
        }
      )
      // .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  const handleDeleteEvent = (e) => {
    e.preventDefault();
  };
  return (
    <div className={style.modifyEvent}>
      <h2>Événement pour modifier</h2>
      {/* {isDialogOpen && (
        <DialogNotification
          returnSetPreviousPage={setModifyPhrase}
          dialogContent={submitMessage}
          setIsDialogOpen={setIsDialogOpen}
        />
      )} */}
      <form className={style.eventForm} onSubmit={handleSubmitEventForm}>
        <textarea
          type="text"
          id="event"
          name="event"
          placeholder={eventData?.response ? eventData?.response?.title : ""}
          onChange={(e) => setModifiedEvent(e.target.value)}
        />
        <label htmlFor="categoriesList" className={style.labelSelectCategories}>
          <h3 className={style.labelTitle}>Catégorie</h3>
          <div className={style.selectContainer}>
            <select
              name="categoriesList"
              id="categoriesList"
              className={`${style.select} ${style.categoriesList}`}
              value={modifiedCategory || eventData?.response?.category_id}
              onChange={(e) => setModifiedCategory(e.target.value)}
            >
              <option defaultChecked>Modifier catégorie</option>
              {categoriesData?.response &&
                categoriesData.response.map((events) => (
                  <option key={events.id} value={events.id}>
                    {events.title}
                  </option>
                ))}
            </select>
            <Link to="/admin/newCategory" className={style.link}>
              <button type="button" className={style.addCategoryBtn}>
                <IconAdd />
                <span className={style.addCategoryBtnDescription}>
                  Ajouter catégorie
                </span>
              </button>
            </Link>
          </div>
        </label>
        <div className={style.buttonsContainer}>
          <button type="button" onClick={handleDeleteEvent}>
            Effacer
          </button>
          <button type="submit">Modifier</button>
          <button
            type="button"
            onClick={() => {
              setModifyEvent(false);
              // getEvent(selectedEventId);
            }}
          >
            Retourner
          </button>
        </div>
      </form>
    </div>
  );
}

ModifyEvent.propTypes = {
  selectedEventId: propTypes.number.isRequired,
  setModifyEvent: propTypes.func.isRequired,
};
