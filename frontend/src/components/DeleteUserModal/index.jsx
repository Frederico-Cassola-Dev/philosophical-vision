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
      <div className={style.userContainer}>
        <p className={style.firstNameField}>
          Prénom: {userData?.response?.firstname}
        </p>
        <p className={style.lastNameField}>
          Nom: {userData?.response?.lastname}
        </p>
        <p className={style.emailField}>Email: {userData?.response?.email}</p>
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
