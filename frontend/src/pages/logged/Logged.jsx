import { useState } from "react";
import useAxios from "../../common/hooks/useAxios";
import PageLoggedModal from "../../common/components/search-select-modal/SearchSelectModal";

export default function Logged() {
  const [filteredCategory, setFilteredCategory] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [chosenCategoryId, setChosenCategoryId] = useState("");
  const [chosenEventId, setChosenEventId] = useState(1);

  const categoriesResponse = useAxios({
    method: "get",
    endpoint: "categories",
  });

  const phrasesResponse = useAxios({
    method: "get",
    endpoint: `phrases/events/${chosenEventId}`,
  });

  const handleOpenModalCategories = (event) => {
    setChosenCategoryId(event);
    setOpenModal(true);
  };

  return (
    <div className="logged">
      {openModal && (
        <PageLoggedModal
          setOpenModal={setOpenModal}
          chosenCategoryId={chosenCategoryId}
          setChosenEventId={setChosenEventId}
        />
      )}
      <div className="inputs-container">
        <input
          type="text"
          className={
            openModal
              ? "input-search-category show-input-search-event"
              : "input-search-category"
          }
          onChange={(e) => {
            setFilteredCategory(e.target.value);
            setOpenModal(true);
          }}
          value={openModal ? filteredCategory : ""}
          placeholder="Search your event"
        />
        <select
          name=""
          id=""
          onChange={(event) => handleOpenModalCategories(event.target.value)}
          value=""
        >
          <option defaultChecked>Select a category</option>
          {categoriesResponse?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="life-event-container">
        <p className="life-event-phrase">
          {phrasesResponse && phrasesResponse[0]?.event_title}
        </p>
      </div>
      <div className="visions-container">
        {phrasesResponse?.map((item) => (
          <p className="vision-phrase" key={item.id}>
            {item.phrase}
          </p>
        ))}
      </div>
    </div>
  );
}
