import { useReducer } from "react";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";
import style from "./newAuthor.module.scss";
import newAuthorReducer, {
  initialState,
  INPUT_KNOWN_NAME,
  INPUT_FIRST_NAME,
  INPUT_LAST_NAME,
  INPUT_PERIOD_ID,
  INPUT_PHILO_CURRENT,
  INPUT_BORN_DATE,
  INPUT_DEAD_DATE,
  INPUT_ERA,
} from "./utils/newAuthor-reducer";

export default function NewAuthor() {
  const [newAuthor, setNewAuthor] = useReducer(newAuthorReducer, initialState);

  const periodsResponse = useAxios({
    method: "get",
    endpoint: "periods",
  });

  const handleNewAuthorPost = () => {
    if (
      newAuthor.knownName &&
      newAuthor.firstName &&
      newAuthor.lastName &&
      newAuthor.periodId &&
      newAuthor.philoCurrent &&
      newAuthor.bornDate &&
      newAuthor.deadDate &&
      newAuthor.era
    ) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/authors`, {
          ...newAuthor,
        })
        .then((response) => console.info(response))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className={style.newAuthor}>
      <h1 className={style.title}>Add new author</h1>
      <form
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleNewAuthorPost();
        }}
      >
        <label htmlFor="knownName" className={style.inputLabel}>
          Known name
          <input
            type="text"
            name="knownName"
            className={style.input}
            value={newAuthor.knownName}
            onChange={(e) =>
              setNewAuthor({
                type: INPUT_KNOWN_NAME,
                payload: { knownName: e.target.value },
              })
            }
          />
        </label>
        <label htmlFor="firstName" className={style.inputLabel}>
          First name
          <input
            type="text"
            name="firstName"
            className={style.input}
            value={newAuthor.firstName}
            onChange={(e) =>
              setNewAuthor({
                type: INPUT_FIRST_NAME,
                payload: { firstName: e.target.value },
              })
            }
          />
        </label>
        <label htmlFor="lastName" className={style.inputLabel}>
          Last name
          <input
            type="text"
            name="lastName"
            className={style.input}
            value={newAuthor.lastName}
            onChange={(e) =>
              setNewAuthor({
                type: INPUT_LAST_NAME,
                payload: { lastName: e.target.value },
              })
            }
          />
        </label>
        <label htmlFor="periodId" className={style.inputLabel}>
          periodId
          <select
            name="periodId"
            id=""
            className={style.select}
            onChange={(e) =>
              setNewAuthor({
                type: INPUT_PERIOD_ID,
                payload: { periodId: e.target.value },
              })
            }
          >
            <option defaultChecked>Select the periodId</option>
            {periodsResponse &&
              periodsResponse.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="philoCurrent" className={style.inputLabel}>
          Philosophical current
          <select
            name="era"
            id=""
            className={style.select}
            onChange={(e) =>
              setNewAuthor({
                type: INPUT_PHILO_CURRENT,
                payload: { philoCurrent: e.target.value },
              })
            }
          >
            <option defaultChecked>Select the periodId</option>
            <option value="1">Socratic</option>
            <option value="2">Illuminism</option>
          </select>
        </label>
        <div className={style.datesContainer}>
          <label htmlFor="bornDate" className={style.inputLabelBorn}>
            Born date
            <input
              type="date"
              name="bornDate"
              className={style.inputDates}
              value={newAuthor.bornDate}
              onChange={(e) =>
                setNewAuthor({
                  type: INPUT_BORN_DATE,
                  payload: { bornDate: e.target.value },
                })
              }
            />
          </label>
          <label htmlFor="deadDate" className={style.inputLabelDead}>
            Dead Date
            <input
              type="date"
              name="deadDate"
              value={newAuthor.deadDate}
              className={style.inputDates}
              onChange={(e) =>
                setNewAuthor({
                  type: INPUT_DEAD_DATE,
                  payload: { deadDate: e.target.value },
                })
              }
            />
          </label>
          <label htmlFor="era" className={style.inputLabelEra}>
            <span className={style.labelNameEra}>Era</span>
            <select
              name="era"
              id=""
              className={style.selectEra}
              onChange={(e) =>
                setNewAuthor({
                  type: INPUT_ERA,
                  payload: { era: e.target.value },
                })
              }
            >
              <option value="BCE">BCE</option>
              <option value="CE">CE</option>
            </select>
          </label>
        </div>
        <div className={style.submitBtnContainer}>
          <button type="submit" className={style.submitBtn}>
            Save the new author
          </button>
        </div>
      </form>
    </div>
  );
}
