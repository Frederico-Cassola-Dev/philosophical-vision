import React, { useState } from "react";
import axios from "axios";

import style from "./resetPassword.module.scss";

export default function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async (event) => {
    axios.defaults.withCredentials = true;
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/resetPassword`, {
        token,
        newPassword,
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={style.resetPassword}>
      <h2 className={style.title}>Reset Password</h2>
      <form className={style.formContainer} onSubmit={handleResetPassword}>
        <label htmlFor="resetToken">
          Votre token
          <input
            type="text"
            id="resetToken"
            name="resetToken"
            placeholder="Insérez votre token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </label>
        <label htmlFor="newPassword">
          Nouvelle mot de passe
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Insérez votre nouvelle mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label htmlFor="confirmPassword" className={style.labelConfirmPassword}>
          Confirmation du mot de passe
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            // className={
            //   newUserValidatorState.confirmPasswordError
            //     ? style.errorInput
            //     : style.inputConfirmPassword
            // }
            required
            // value={newUserState.confirmPassword}
            // onChange={(e) => {
            //   dispatchForm({
            //     type: SIGN_UP_UPDATE_CONFIRM_PASSWORD,
            //     payload: { confirmPassword: e.target.value },
            //   });
            //   dispatchForm({
            //     type: SIGN_UP_UPDATE_PASSWORDS_MATCH,
            //     payload: {
            //       passwordsMatch: !!(newUserState.password === e.target.value),
            //     },
            //   });
            // }}
            // onBlur={() => {
            //   dispatchValidatorForm({
            //     type: SIGN_UP_VALIDATE_CONFIRM_PASSWORD,
            //     payload: newUserState,
            //   });
            //   dispatchValidatorForm({
            //     type: SIGN_UP_VALIDATE_PASSWORD_MATCH,
            //     payload: newUserState,
            //   });
            // }}
          />
          <span
          // className={
          //   newUserValidatorState.passwordsMatch
          //     ? style.inputValidationMessage
          //     : style.inputValidationHidden
          // }
          >
            Le mot de passe doit égale
          </span>
        </label>
        <div className={style.submitButtonContainer}>
          <button type="submit">Réinitialiser votre mot de passe</button>
        </div>
      </form>
    </div>
  );
}
