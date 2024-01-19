import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

import ModifyPhrase from "../../../components/ModifyPhrase";
import ModifyEvent from "../../../components/ModifyEvent";
import DeleteUserModal from "../../../components/DeleteUserModal";

import style from "./tablesDB.module.scss";

export default function TablesDB() {
  const { table } = useParams();

  const [selectedPhraseId, setSelectedPhraseId] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [modifyPhrase, setModifyPhrase] = useState(false);
  const [modifyEvent, setModifyEvent] = useState(false);
  // console.log("🚀 - modifyEvent:", modifyEvent)

  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [updateTable, setUpdateTable] = useState(false);

  const tableData = useAxios(
    {
      method: "get",
      endpoint: `${table}`,
    },
    [
      modifyPhrase,
      modifyEvent,
      selectedPhraseId,
      updateTable,
      deleteUserModal,
      selectedUserId,
    ]
  );

  const totalLikesData = useAxios(
    {
      method: "get",
      endpoint: "usersPhrases/totalLikes",
    },
    [
      modifyPhrase,
      selectedPhraseId,
      updateTable,
      deleteUserModal,
      selectedUserId,
    ]
  );

  return (
    <>
      {modifyPhrase && (
        <ModifyPhrase
          modifyPhrase={modifyPhrase}
          selectedPhraseId={selectedPhraseId}
          setModifyPhrase={setModifyPhrase}
          updateTable={updateTable}
          setUpdateTable={setUpdateTable}
        />
      )}
      {modifyEvent && (
        <ModifyEvent
          selectedEventId={selectedEventId}
          setModifyEvent={setModifyEvent}
        />
      )}
      {deleteUserModal && (
        <DeleteUserModal
          setDeleteUserModal={setDeleteUserModal}
          selectedUserId={selectedUserId}
        />
      )}
      {!modifyPhrase && !deleteUserModal && (
        <div className={style.tablesDB}>
          <div className={style.linkContainer}>
            <Link to="/admin" className={style.linkReturnBtn}>
              Retourner
            </Link>
          </div>
          <section className={style.sectionTable}>
            <table className={style.table}>
              <thead>
                {table === "phrases" && (
                  <tr>
                    <th>Phrase</th>
                    <th>Auteur</th>
                    <th>Likes</th>
                    <th>Événements</th>
                  </tr>
                )}
                {table === "events" && (
                  <tr>
                    <th>Titre</th>
                    <th>Catégorie Id</th>
                  </tr>
                )}
                {table === "authors" && (
                  <tr>
                    <th>Nom connu</th>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Période</th>
                    <th>Current Philo</th>
                    <th>Né</th>
                    <th>Décès</th>
                    <th>Era</th>
                  </tr>
                )}
                {table === "categories" && (
                  <tr>
                    <th>Titre</th>
                    <th>Description</th>
                  </tr>
                )}
                {table === "users" && (
                  <tr>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Rôle</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {table === "phrases" &&
                  tableData?.response?.map((item) => {
                    const totalLikesResponse = totalLikesData?.response?.find(
                      (phrase) => phrase.phrase_id === item.id
                    );

                    return (
                      <tr
                        key={item.id}
                        onClick={() => {
                          setModifyPhrase(true);
                          setSelectedPhraseId(item.id);
                        }}
                      >
                        <td>{item.phrase}</td>
                        <td>{item.author}</td>
                        <td>{totalLikesResponse?.total_likes || 0}</td>
                        <td>{item.event_title}</td>
                      </tr>
                    );
                  })}
                {table === "events" &&
                  tableData?.response?.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setModifyEvent(true);
                        setSelectedEventId(item.id);
                      }}
                    >
                      <td>{item.title}</td>
                      <td>{item.category_id}</td>
                    </tr>
                  ))}
                {table === "authors" &&
                  tableData?.response?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.known_name}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.period_title}</td>
                      <td>{item.philo_current_title}</td>
                      <td>{item.born_date}</td>
                      <td>{item.dead_date}</td>
                      <td>{item.era}</td>
                    </tr>
                  ))}
                {table === "categories" &&
                  tableData?.response?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
                {table === "users" &&
                  tableData?.response?.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setDeleteUserModal(true);
                        setSelectedUserId(item.id);
                      }}
                    >
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.email}</td>
                      <td>{item.role_name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
          <div className={style.linkContainer}>
            <Link to="/admin" className={style.linkReturnBtn}>
              Retourner
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
