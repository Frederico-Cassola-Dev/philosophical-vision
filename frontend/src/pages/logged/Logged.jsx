import { useState } from "react";
import useRequest from "../../common/hooks/useRequest";

export default function Logged() {
  const [filteredPhrase, setFilteredPhrase] = useState({});
  const eventsResponse = useRequest({
    method: "get",
    endpoint: "events",
  });
  // const categoriesResponse = useRequest({
  //   method: "get",
  //   endpoint: "categories",
  // });
  const phrasesResponse = useRequest({
    method: "get",
    endpoint: "phrases",
  });

  return (
    <div className="logged">
      <div className="input-container">
        <input
          type="text"
          onChange={(e) => setFilteredPhrase(e.target.value)}
          value={filteredPhrase}
        />
        <select name="" id="">
          <option disabled>Select a life event</option>
          {eventsResponse?.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
      </div>
      <div className="life-event-container">
        <p className="life-event-phrase">Bla Bla Bla Bla Bla Bla Bla Bla Bla</p>
      </div>
      <div className="visions-container">
        {phrasesResponse
          ?.filter(
            (phrase) =>
              phrase.phrase.toLowerCase().includes(filteredPhrase) ||
              phrase.phrase.toUpperCase().includes(filteredPhrase)
          )
          .map((item) => (
            <p className="vision-phrase">{item.phrase}</p>
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
