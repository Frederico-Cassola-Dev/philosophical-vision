import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

import style from "./tablesDB.module.scss";

export default function TablesDB() {
  const { table } = useParams();
  // console.log("🚀 - table:", table);

  const tableResponse = useAxios({
    method: "get",
    endpoint: `${table}`,
  });
  // console.log("🚀 - tableResponse:", tableResponse);

  return (
    <div className={style.tablesDB}>
      <table>
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
              <th>Period Id</th>
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
              <tr key={item.id}>
                <td>{item.phrase}</td>
                <td>{item.authors_id}</td>
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
                <td>{item.Known_name}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.period_id}</td>
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
    </div>
  );
}
