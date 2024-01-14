import React, { useReducer, useState } from "react";
import axios from "axios";
import signUpFormReducer, {
  SIGN_UP_UPDATE_PASSWORD,
  SIGN_UP_UPDATE_CONFIRM_PASSWORD,
  SIGN_UP_UPDATE_PASSWORDS_MATCH,
  signUpInitialState,
} from "../SignUp/utils/signUp-form-reducer";

import signUpFormValidatorReducer, {
  SIGN_UP_VALIDATE_PASSWORD,
  SIGN_UP_VALIDATE_CONFIRM_PASSWORD,
  SIGN_UP_VALIDATE_PASSWORD_MATCH,
  signUpInitialValidatorState,
} from "../SignUp/utils/signUp-form-validator-reducer";

import style from "./resetPassword.module.scss";

export default function ResetPassword() {
  const [newUserState, dispatchForm] = useReducer(
    signUpFormReducer,
    signUpInitialState
  );
  const [newUserValidatorState, dispatchValidatorForm] = useReducer(
    signUpFormValidatorReducer,
    signUpInitialValidatorState
  );
  const [token, setToken] = useState("");

  const handleResetPassword = async (event) => {
    axios.defaults.withCredentials = true;
    event.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/resetPassword`, {
        token,
        newPassword: newUserState.password,
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
            className={
              newUserValidatorState.passwordError
                ? style.errorInput
                : style.inputPassword
            }
            required
            value={newUserState.password}
            onChange={(e) => {
              dispatchForm({
                type: SIGN_UP_UPDATE_PASSWORD,
                payload: { password: e.target.value },
              });
              dispatchForm({
                type: SIGN_UP_UPDATE_PASSWORDS_MATCH,
                payload: {
                  passwordsMatch: !!(
                    newUserState.confirmPassword === e.target.value
                  ),
                },
              });
            }}
            onBlur={() => {
              dispatchValidatorForm({
                type: SIGN_UP_VALIDATE_PASSWORD,
                payload: newUserState,
              });
              dispatchValidatorForm({
                type: SIGN_UP_VALIDATE_PASSWORD_MATCH,
                payload: newUserState,
              });
            }}
          />
          <span
            className={
              newUserValidatorState.passwordError
                ? style.inputValidationMessage
                : style.inputPasswordValidationHidden
            }
          >
            Le mot de passe doit contenir ou minimum 8 caractères, une lettre
            majuscule, une lettre minuscule, un chiffre et un caractère spécial
          </span>
        </label>
        <label htmlFor="confirmPassword" className={style.labelConfirmPassword}>
          Confirmation du mot de passe
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className={
              newUserValidatorState.confirmPasswordError
                ? style.errorInput
                : style.inputConfirmPassword
            }
            required
            value={newUserState.confirmPassword}
            placeholder="Confirmation du mot de passe"
            onChange={(e) => {
              dispatchForm({
                type: SIGN_UP_UPDATE_CONFIRM_PASSWORD,
                payload: { confirmPassword: e.target.value },
              });
              dispatchForm({
                type: SIGN_UP_UPDATE_PASSWORDS_MATCH,
                payload: {
                  passwordsMatch: !!(newUserState.password === e.target.value),
                },
              });
            }}
            onBlur={() => {
              dispatchValidatorForm({
                type: SIGN_UP_VALIDATE_CONFIRM_PASSWORD,
                payload: newUserState,
              });
              dispatchValidatorForm({
                type: SIGN_UP_VALIDATE_PASSWORD_MATCH,
                payload: newUserState,
              });
            }}
          />
          <span
            className={
              newUserValidatorState.passwordsMatch
                ? style.inputValidationMessage
                : style.inputValidationHidden
            }
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
