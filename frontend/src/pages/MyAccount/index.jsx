import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import userContext from "../../contexts/userContext";

import style from "./myAccount.module.scss";

export default function MyAccount() {
  // TODO - logout after user modifications and sign in with the new info
  // TODO - Style wrong password not ok UI/UX
  // TODO - Create a reducer to manage the states
  // TODO - verify old password on backend - DONE
  // TODO - make the put for the new password - DONE
  // TODO - update local storage with the user modifications - DONE
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [newLastName, setNewLastName] = useState(null);
  const [newFirstName, setNewFirstName] = useState(null);
  const [newEmail, setNewEmail] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [validateOldPassword, setValidateOldPassword] = useState(null);
  const [modifyMessage, setModifyMessage] = useState({
    isModify: false,
    message: "",
  });
  // console.log("🚀 - modifyMessage:", modifyMessage);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      (newLastName || newFirstName || newEmail || newPassword) &&
      validateOldPassword
    ) {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/api/users/${user?.id}`, {
          newLastName: newLastName || user.lastname,
          newFirstName: newFirstName || user.firstname,
          newEmail: newEmail && validateOldPassword ? newEmail : user.email,
          password: validateOldPassword && newPassword,
        })
        .then((response) => {
          console.info(response);
          if (response.data.changedRows.length !== 0) {
            setModifyMessage({
              isModify: true,
              message: "Utilisateur modifié avec success",
            });
          } else {
            setModifyMessage({
              isModify: false,
              message: "",
            });
          }
        })
        .catch((err) => console.error(err));
    } else {
      setModifyMessage({
        isModify: false,
        message: "Rien à modifier ou manque de mot de passe",
      });
    }
  };

  const handleModifyOldPassword = (passwordToVerify) => {
    axios.defaults.withCredentials = true;
    if (passwordToVerify) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${
            user.id
          }/verifypassword`,
          { password: passwordToVerify }
        )
        .then((response) => {
          setValidateOldPassword(response.data.auth);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className={style.myAccount}>
      <form className={style.formInput} onSubmit={handleSubmit}>
        <label htmlFor="lastName" className={style.labelLastName}>
          Nom
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder={user?.lastname}
            onChange={(e) => setNewLastName(e.target.value)}
          />
        </label>
        <label htmlFor="firstName" className={style.labelFirstName}>
          Prénom
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder={user?.firstname}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
        </label>
        <label htmlFor="email" className={style.labelEmail}>
          E-mail
          <input
            type="email"
            name="email"
            id="email"
            placeholder={user?.email}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </label>
        <label htmlFor="oldPassword" className={style.labelPassword1}>
          Mot de passe actuel
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            className={validateOldPassword ? null : style.errorInput}
            onChange={(e) => setOldPassword(e.target.value)}
            onBlur={() => handleModifyOldPassword(oldPassword)}
          />
        </label>
        <label htmlFor="password" className={style.labelPassword1}>
          Nouvelle mot de passe
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label htmlFor="secondPassword" className={style.labelPassword2}>
          Nouvelle mot de passe
          <input type="password" name="secondPassword" id="secondPassword" />
        </label>
        <p
          className={
            modifyMessage.message
              ? style.errorMessage
              : style.errorMessageHidden
          }
        >
          {modifyMessage.message}
        </p>
        <div className={style.submitButtonContainer}>
          {modifyMessage.isModify ? (
            <button
              type="button"
              onClick={() => {
                localStorage.clear();
                navigate("/signIn");

                setModifyMessage({
                  isModify: false,
                  message: "",
                });
              }}
            >
              Close
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
}
