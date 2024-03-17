import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

import ModifyPhrase from "../../../components/ModifyPhrase";
import ModifyEvent from "../../../components/ModifyEvent";
import DeleteUserModal from "../../../components/DeleteUserModal";

import style from "./tablesDB.module.scss";
import ModifyCategory from "../../../components/ModifyCategory";
import ModifyAuthor from "../../../components/ModifyAuthor";

export default function TablesDB() {
  const { table } = useParams();

  const [selectedPhraseId, setSelectedPhraseId] = useState("");
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedAuthorId, setSelectedAuthorId] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [modifyPhrase, setModifyPhrase] = useState(false);
  const [modifyEvent, setModifyEvent] = useState(false);
  const [modifyAuthor, setModifyAuthor] = useState(false);
  const [modifyCategory, setModifyCategory] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);

  const tableData = useAxios(
    {
      method: "get",
      endpoint: `${table}`,
    },
    [modifyPhrase, modifyEvent, modifyAuthor, modifyCategory, deleteUserModal]
  );

  const totalLikesData = useAxios(
    {
      method: "get",
      endpoint: "usersPhrases/totalLikes",
    },
    [modifyPhrase, deleteUserModal]
  );

  return (
    <>
      {modifyPhrase && (
        <ModifyPhrase
          modifyPhrase={modifyPhrase}
          selectedPhraseId={selectedPhraseId}
          setModifyPhrase={setModifyPhrase}
        />
      )}
      {modifyEvent && (
        <ModifyEvent
          selectedEventId={selectedEventId}
          setModifyEvent={setModifyEvent}
        />
      )}
      {modifyAuthor && (
        <ModifyAuthor
          selectedAuthorId={selectedAuthorId}
          setModifyAuthor={setModifyAuthor}
        />
      )}
      {modifyCategory && (
        <ModifyCategory
          selectedCategoryId={selectedCategoryId}
          setModifyCategory={setModifyCategory}
        />
      )}
      {deleteUserModal && (
        <DeleteUserModal
          setDeleteUserModal={setDeleteUserModal}
          selectedUserId={selectedUserId}
        />
      )}
      {!modifyPhrase &&
        !modifyEvent &&
        !modifyAuthor &&
        !modifyCategory &&
        !deleteUserModal && (
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
                      <th>Catégorie</th>
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
                      <th>Google name</th>
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
                        <td>{item.category_title}</td>
                      </tr>
                    ))}
                  {table === "authors" &&
                    tableData?.response?.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => {
                          setModifyAuthor(true);
                          setSelectedAuthorId(item.id);
                        }}
                      >
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
                      <tr
                        key={item.id}
                        onClick={() => {
                          setModifyCategory(true);
                          setSelectedCategoryId(item.id);
                        }}
                      >
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
                        <td>{item.google_name}</td>
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
