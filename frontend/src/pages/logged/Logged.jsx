import { useState } from "react";
import useRequest from "../../common/hooks/useRequest";
import PageLoggedModal from "../../common/components/search-select-modal/SearchSelectModal";

export default function Logged() {
  const [filteredCategory, setFilteredCategory] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const eventsResponse = useRequest({
    method: "get",
    endpoint: "events",
  });

  const categoriesResponse = useRequest({
    method: "get",
    endpoint: "categories",
  });

  const handleOpenModalCategories = () => {
    setOpenModal(true);
  };

  return (
    <div className="logged">
      <PageLoggedModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={eventsResponse}
      />
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
          value={filteredCategory}
          placeholder="Search your event"
        />
        <select
          name=""
          id=""
          onChange={(event) => handleOpenModalCategories(event.target.value)}
        >
          <option>Select a category</option>
          {categoriesResponse?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="life-event-container">
        {/* {eventsResponse?.map((item) => (
          <p className="life-event-phrase" key={item.id}>
            {item.title}
          </p>
        ))} */}
        <p className="life-event-phrase">life event phrase</p>
      </div>
      <div className="visions-container">
        {/* {categoriesResponse
          ?.filter(
            (category) =>
              category.title.toLowerCase().includes(filteredCategory) ||
              category.title.toUpperCase().includes(filteredCategory)
          )
          .map((item) => (
            <p className="vision-phrase" key={item.id}>
              {item.title}
            </p>
          ))} */}
        <p className="vision-phrase">
          Bla Bla Bla 1 Bla Bla Bla 1 Bla Bla Bla 1 Bla Bla Bla 1
        </p>
        <p className="vision-phrase">
          Bla Bla Bla 2 Bla Bla Bla 2 Bla Bla Bla 2 Bla Bla Bla 2
        </p>
        <p className="vision-phrase">
          Bla Bla Bla 3 Bla Bla Bla 3 Bla Bla Bla 3 Bla Bla Bla 3
        </p>
        <p className="vision-phrase">
          Bla Bla Bla 4 Bla Bla Bla 4 Bla Bla Bla 4 Bla Bla Bla 4
        </p>
      </div>
    </div>
  );
}
