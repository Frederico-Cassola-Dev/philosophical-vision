import { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import signUpFormReducer, {
  SIGN_UP_UPDATE_EMAIL,
  SIGN_UP_UPDATE_EMAIL_MESSAGE,
  signUpInitialState,
} from "../SignUp/utils/signUp-form-reducer";
import signUpFormValidatorReducer, {
  SIGN_UP_VALIDATE_EMAIL,
  signUpInitialValidatorState,
} from "../SignUp/utils/signUp-form-validator-reducer";

import DialogNotification from "../../components/DialogNotification";
import style from "./forgotPassword.module.scss";

export default function ForgotPassword() {
  const inputRef = useRef(null);
  const [newUserState, dispatchForm] = useReducer(
    signUpFormReducer,
    signUpInitialState
  );
  const [newUserValidatorState, dispatchValidatorForm] = useReducer(
    signUpFormValidatorReducer,
    signUpInitialValidatorState
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleForgotPassword = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/forgotPassword`, {
        email: newUserState.email,
      })
      .then((response) => {
        if (response.status === 200) {
          setSubmitMessage("Email envoyé avec success");
          setIsDialogOpen(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setSubmitMessage("Ce email n'est pas enregistré");
        }

        if (err.response.status === 500) {
          setSubmitMessage("Problème rencontré, essayez à nouveau");
        }
        setIsDialogOpen(true);
      });
  };

  return (
    <div className={style.forgotPassword}>
      {isDialogOpen && (
        <DialogNotification
          dialogContent={submitMessage}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
      <h1 className={style.title}>ForgotPassword</h1>
      <form onSubmit={handleForgotPassword} className={style.formContainer}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            placeholder="Insérez votre email"
            required
            name="email"
            id="email"
            autoComplete="email"
            ref={inputRef}
            className={
              newUserValidatorState.emailError || newUserState.emailMessage
                ? style.errorInput
                : style.inputEmail
            }
            value={newUserState.email.email}
            onChange={(e) => {
              dispatchForm({
                type: SIGN_UP_UPDATE_EMAIL,
                payload: { email: e.target.value },
              });
              dispatchForm({
                type: SIGN_UP_UPDATE_EMAIL_MESSAGE,
                payload: { emailMessage: "" },
              });
            }}
            onBlur={() =>
              dispatchValidatorForm({
                type: SIGN_UP_VALIDATE_EMAIL,
                payload: newUserState,
              })
            }
          />
          <span
            className={
              newUserValidatorState.emailError || newUserState.emailMessage
                ? style.inputValidationMessage
                : style.inputValidationHidden
            }
          >
            {newUserState.emailMessage
              ? newUserState.emailMessage
              : "Insérez un email correct"}
          </span>
        </label>
        <div className={style.submitButtonContainer}>
          <button type="submit"> Envoyer l'email de recuperation</button>{" "}
        </div>
      </form>
    </div>
  );
}
