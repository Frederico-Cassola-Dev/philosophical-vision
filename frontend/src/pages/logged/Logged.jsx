import { useState } from "react";
import useRequest from "../../common/hooks/useRequest";

export default function Logged() {
  const [filteredCategory, setFilteredCategory] = useState("");
  const eventsResponse = useRequest({
    method: "get",
    endpoint: "events",
  });

  const categoriesResponse = useRequest({
    method: "get",
    endpoint: "categories",
  });

  // const phrasesResponse = useRequest({
  //   method: "get",
  //   endpoint: "phrases",
  // });

  return (
    <div className="logged">
      <div className="input-container">
        <input
          type="text"
          onChange={(e) => setFilteredCategory(e.target.value)}
          value={filteredCategory}
          placeholder="Chose your theme"
        />
        <select name="" id="">
          <option disabled>Select a life event</option>
          {categoriesResponse?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className="life-event-container">
        {eventsResponse?.map((item) => (
          <p className="life-event-phrase" key={item.id}>
            {item.title}
          </p>
        ))}
      </div>
      <div className="visions-container">
        {categoriesResponse
          ?.filter(
            (category) =>
              category.title.toLowerCase().includes(filteredCategory) ||
              category.title.toUpperCase().includes(filteredCategory)
          )
          .map((item) => (
            <p className="vision-phrase" key={item.id}>
              {item.title}
            </p>
          ))}
        {/* <p className="vision-phrase">
          Bla Bla Bla 2 Bla Bla Bla 2 Bla Bla Bla 2 Bla Bla Bla 2
        </p>
        <p className="vision-phrase">
          Bla Bla Bla 3 Bla Bla Bla 3 Bla Bla Bla 3 Bla Bla Bla 3
        </p>
        <p className="vision-phrase">
          Bla Bla Bla 4 Bla Bla Bla 4 Bla Bla Bla 4 Bla Bla Bla 4
        </p> */}
      </div>
    </div>
  );
}
