import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import signUpFormReducer, {
  SIGN_UP_UPDATE_FIRST_NAME,
  SIGN_UP_UPDATE_LAST_NAME,
  SIGN_UP_UPDATE_EMAIL,
  SIGN_UP_UPDATE_EMAIL_MESSAGE,
  SIGN_UP_UPDATE_PASSWORD,
  SIGN_UP_UPDATE_CONFIRM_PASSWORD,
  SIGN_UP_UPDATE_PASSWORDS_MATCH,
  signUpInitialState,
} from "./utils/signUp-form-reducer";
import signUpFormValidatorReducer, {
  SIGN_UP_VALIDATE_FIRST_NAME,
  SIGN_UP_VALIDATE_LAST_NAME,
  SIGN_UP_VALIDATE_EMAIL,
  SIGN_UP_VALIDATE_PASSWORD,
  SIGN_UP_VALIDATE_CONFIRM_PASSWORD,
  SIGN_UP_VALIDATE_PASSWORD_MATCH,
  signUpInitialValidatorState,
} from "./utils/signUp-form-validator-reducer";

import style from "./signUp.module.scss";

export default function SignUp() {
  const navigate = useNavigate();
  const [newUserState, dispatchForm] = useReducer(
    signUpFormReducer,
    signUpInitialState
  );

  const [newUserValidatorState, dispatchValidatorForm] = useReducer(
    signUpFormValidatorReducer,
    signUpInitialValidatorState
  );

  const handleNeuUserPost = (newUserData) => {
    if (newUserValidatorState.isFormValid) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          email: newUserData.email,
          password: newUserData.password,
        })
        .then((response) => {
          if (response.status === 201) {
            navigate("/signIn");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            dispatchForm({
              type: SIGN_UP_UPDATE_EMAIL_MESSAGE,
              payload: { emailMessage: err.response.data.message },
            });
          }
        });
    }
  };

  return (
    <div className={style.signUp}>
      <form
        className={style.formInput}
        onSubmit={(e) => {
          e.preventDefault();
          handleNeuUserPost(newUserState);
        }}
      >
        <label htmlFor="lastName" className={style.labelLastName}>
          Nom
          <input
            type="text"
            name="lastName"
            id="lastName"
            className={
              newUserValidatorState.lastNameError
                ? style.errorInput
                : style.inputLastName
            }
            required
            autoComplete="family-name"
            value={newUserState.lastName}
            onChange={(e) =>
              dispatchForm({
                type: SIGN_UP_UPDATE_LAST_NAME,
                payload: { lastName: e.target.value },
              })
            }
            onBlur={() =>
              dispatchValidatorForm({
                type: SIGN_UP_VALIDATE_LAST_NAME,
                payload: newUserState,
              })
            }
          />
          <span
            className={
              newUserValidatorState.lastNameError
                ? style.inputValidationMessage
                : style.inputValidationHidden
            }
          >
            Le nom ne doit pas avoir d'espaces
          </span>
        </label>
        <label htmlFor="firstName" className={style.labelFirstName}>
          Prénom
          <input
            type="text"
            name="firstName"
            id="firstName"
            className={
              newUserValidatorState.firstNameError
                ? style.errorInput
                : style.inputFirstName
            }
            autoComplete="given-name"
            required
            value={newUserState.firstName}
            onChange={(e) =>
              dispatchForm({
                type: SIGN_UP_UPDATE_FIRST_NAME,
                payload: { firstName: e.target.value },
              })
            }
            onBlur={() =>
              dispatchValidatorForm({
                type: SIGN_UP_VALIDATE_FIRST_NAME,
                payload: newUserState,
              })
            }
          />
          <span
            className={
              newUserValidatorState.firstNameError
                ? style.inputValidationMessage
                : style.inputValidationHidden
            }
          >
            Le prénom ne doit pas avoir d'espaces
          </span>
        </label>
        <label htmlFor="email" className={style.labelEmail}>
          E-mail
          <input
            type="email"
            name="email"
            id="email"
            className={
              newUserValidatorState.emailError || newUserState.emailMessage
                ? style.errorInput
                : style.inputEmail
            }
            required
            autoComplete="email"
            value={newUserState.email}
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
        <label htmlFor="password" className={style.labelPassword1}>
          Mot de passe
          <input
            type="password"
            name="password"
            id="password"
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
          <button type="submit">Envoyer</button>
        </div>
      </form>
    </div>
  );
}
