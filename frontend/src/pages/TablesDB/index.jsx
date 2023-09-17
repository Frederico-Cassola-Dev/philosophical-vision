// import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

import style from "./tablesDB.module.scss";

export default function TablesDB() {
  const { table } = useParams();
  const [numberColumnsToShow, setNumberColumnsToShow] = useState(1);
  // console.log("🚀 - numberColumnsToShow:", numberColumnsToShow);

  // console.log("🚀 - table:", table);

  const tableResponse = useAxios({
    method: "get",
    endpoint: `${table}`,
  });
  // console.log("🚀 - tableResponse:", tableResponse);

  // useEffect(() => {
  //   if (tableResponse) {
  //     console.info("je suis");
  //     for (let i = 0; i < tableResponse.length; i += 1) {
  //       tableResponse[i].column1 = tableResponse[i].phrase;
  //       delete tableResponse[i].phrase;
  //       tableResponse[i].column2 = tableResponse[i].authors_id;
  //       delete tableResponse[i].authors_id;
  //       tableResponse[i].column3 = tableResponse[i].likes;
  //       delete tableResponse[i].likes;
  //       tableResponse[i].column4 = tableResponse[i].title;
  //       delete tableResponse[i].title;
  //       tableResponse[i].column5 = tableResponse[i].category_id;
  //       delete tableResponse[i].category_id;
  //       tableResponse[i].column6 = tableResponse[i].phrase;
  //       delete tableResponse[i].phrase;
  //       console.info(tableResponse[i]);
  //     }
  //   }
  // }, [tableResponse]);
  return (
    <div className={style.tablesDB}>
      <div className={style.linkContainer}>
        <Link to="/admin" className={style.linkReturnBtn}>
          Return
        </Link>
      </div>
      <table className={style.table}>
        <thead>
          {table === "phrases" && (
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Likes</th>
            </tr>
          )}
          {table === "events" && (
            <tr>
              <th>Title</th>
              <th>Category Id</th>
            </tr>
          )}
          {table === "authors" && numberColumnsToShow === 1 && (
            <tr>
              <th>Known Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Period Id</th>
              <th>Philo current</th>
              <th>Born</th>
              <th>Dead</th>
              <th>Era</th>
            </tr>
          )}
          {table === "authors" && numberColumnsToShow === 2 && (
            <tr>
              <th>Known Name</th>
              <th>First Name</th>
            </tr>
          )}
          {table === "authors" && numberColumnsToShow === 3 && (
            <tr>
              <th>Known Name</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          )}
          {table === "authors" && numberColumnsToShow === 4 && (
            <tr>
              <th>Known Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Period Id</th>
            </tr>
          )}
          {table === "authors" && numberColumnsToShow === 5 && (
            <tr>
              <th>Known Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Period Id</th>
              <th>Philo current</th>
            </tr>
          )}
          {table === "authors" && numberColumnsToShow === 6 && (
            <tr>
              <th>Known Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Period Id</th>
              <th>Philo current</th>
              <th>Born</th>
            </tr>
          )}
          {table === "authors" && numberColumnsToShow === 7 && (
            <tr>
              <th>Known Name</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Period Id</th>
              <th>Philo current</th>
              <th>Born</th>
              <th>Dead</th>
            </tr>
          )}

          {table === "categories" && (
            <tr>
              <th>Title</th>
              <th>Description</th>
            </tr>
          )}
          {table === "users" && (
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          )}
        </thead>
        <tbody>
          {table === "phrases" &&
            tableResponse &&
            tableResponse.map((item) => (
              <tr key={item.id}>
                <td>{item.phrase}</td>
                <td>{item.author}</td>
                <td>{item.likes}</td>
              </tr>
            ))}
          {table === "events" &&
            tableResponse &&
            tableResponse.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.category_id}</td>
              </tr>
            ))}
          {table === "authors" &&
            tableResponse &&
            tableResponse.map((item) => {
              if (numberColumnsToShow === 2) {
                return (
                  <tr key={item.id}>
                    <td>{item.known_name}</td>
                    <td>{item.firstname}</td>
                  </tr>
                );
              }
              if (numberColumnsToShow === 3) {
                return (
                  <tr key={item.id}>
                    <td>{item.known_name}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                  </tr>
                );
              }
              if (numberColumnsToShow === 4) {
                return (
                  <tr key={item.id}>
                    <td>{item.known_name}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.period_id}</td>
                  </tr>
                );
              }
              if (numberColumnsToShow === 5) {
                return (
                  <tr key={item.id}>
                    <td>{item.known_name}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.period_id}</td>
                    <td>{item.philo_current}</td>
                  </tr>
                );
              }
              if (numberColumnsToShow === 6) {
                return (
                  <tr key={item.id}>
                    <td>{item.known_name}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.period_id}</td>
                    <td>{item.philo_current}</td>
                    <td>{item.born_date}</td>
                  </tr>
                );
              }
              if (numberColumnsToShow === 7) {
                return (
                  <tr key={item.id}>
                    <td>{item.known_name}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.period_id}</td>
                    <td>{item.philo_current}</td>
                    <td>{item.born_date}</td>
                    <td>{item.dead_date}</td>
                  </tr>
                );
              }
              return (
                <tr key={item.id}>
                  <td>{item.known_name} hello</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.period_id}</td>
                  <td>{item.philo_current}</td>
                  <td>{item.born_date}</td>
                  <td>{item.dead_date}</td>
                </tr>
              );
            })}
          {table === "categories" &&
            tableResponse &&
            tableResponse.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          {table === "users" &&
            tableResponse &&
            tableResponse.map((item) => (
              <tr key={item.id}>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={style.columnBtnContainer}>
        <button
          type="button"
          className={style.columnBtn}
          onClick={() => setNumberColumnsToShow(2)}
        >
          2
        </button>
        <button
          type="button"
          className={style.columnBtn}
          onClick={() => setNumberColumnsToShow(3)}
        >
          3
        </button>
        <button
          type="button"
          className={style.columnBtn}
          onClick={() => setNumberColumnsToShow(4)}
        >
          4
        </button>
        <button
          type="button"
          className={style.columnBtn}
          onClick={() => setNumberColumnsToShow(5)}
        >
          5
        </button>
        <button
          type="button"
          className={style.columnBtn}
          onClick={() => setNumberColumnsToShow(6)}
        >
          6
        </button>
        <button
          type="button"
          className={style.columnBtn}
          onClick={() => setNumberColumnsToShow(7)}
        >
          7
        </button>
        <button
          type="button"
          className={style.columnBtn}
          onClick={() => setNumberColumnsToShow(1)}
        >
          all
        </button>
      </div>
      <div className={style.linkContainer}>
        <Link to="/admin" className={style.linkReturnBtn}>
          Return
        </Link>
      </div>
    </div>
  );
}
