import propTypes from "prop-types";
import axios from "axios";
import useAxios from "../../hooks/useAxios";

import style from "./deleteUserModal.module.scss";

export default function DeleteUserModal({
  setDeleteUserModal,
  selectedUserId,
}) {
  const userData = useAxios(
    {
      method: "get",
      endpoint: `users/${selectedUserId}`,
    },
    [selectedUserId]
  );

  const handleDeleteUser = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${selectedUserId}`)
      .then(() => setDeleteUserModal(false))
      .catch((err) => console.error(err));
  };

  return (
    <div className={style.deleteUserModal}>
      <h2>Effacer utilisateur</h2>
      <div className={style.userContainer}>
        <div className={style.userFieldContainer}>
          <p className={style.title}>Prénom:</p>
          <p className={style.content}>{userData?.response?.first_name}</p>
        </div>
        <div className={style.userFieldContainer}>
          <p className={style.title}>Nom:</p>
          <p className={style.content}> {userData?.response?.last_name}</p>
        </div>
        <div className={style.userFieldContainer}>
          <p className={style.title}>Email:</p>
          <p className={style.content}> {userData?.response?.email}</p>
        </div>
        <div className={style.userFieldContainer}>
          <p className={style.title}> Rôle:</p>
          <p className={style.content}> {userData?.response?.role_name}</p>
        </div>
      </div>
      <div className={style.buttonsContainer}>
        <button type="button" onClick={handleDeleteUser}>
          Effacer
        </button>
        <button type="button" onClick={() => setDeleteUserModal(false)}>
          Retourner
        </button>
      </div>
    </div>
  );
}

DeleteUserModal.propTypes = {
  selectedUserId: propTypes.number.isRequired,
  setDeleteUserModal: propTypes.func.isRequired,
};
