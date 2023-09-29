import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

import style from "./tablesDB.module.scss";
import AdminModifyModal from "../../components/AdminModifyModal";

export default function TablesDB() {
  const { table } = useParams();
  const [selectedPhraseId, setSelectedPhraseId] = useState("");

  const tableResponse = useAxios({
    method: "get",
    endpoint: `${table}`,
  });

  const [modifyModal, setModifyModal] = useState(false);

  return (
    <div className={style.tablesDB}>
      {modifyModal && <AdminModifyModal selectedPhraseId={selectedPhraseId} />}
      <div className={style.linkContainer}>
        <Link to="/admin" className={style.linkReturnBtn}>
          Return
        </Link>
      </div>
      <section className={style.tableBody}>
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
            {table === "authors" && (
              <tr>
                <th>Known Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Period</th>
                <th>Philo current</th>
                <th>Born</th>
                <th>Dead</th>
                <th>Era</th>
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
                <tr
                  key={item.id}
                  onClick={() => {
                    setModifyModal(true);
                    setSelectedPhraseId(item.id);
                  }}
                >
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
              tableResponse.map((item) => (
                <tr key={item.id}>
                  <td>{item.known_name}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.period_title}</td>
                  <td>{item.philo_current}</td>
                  <td>{item.born_date}</td>
                  <td>{item.dead_date}</td>
                  <td>{item.era}</td>
                </tr>
              ))}
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
      </section>
      <div className={style.linkContainer}>
        <Link to="/admin" className={style.linkReturnBtn}>
          Return
        </Link>
      </div>
    </div>
  );
}
