import { useReducer } from "react";
import axios from "axios";
import defaultAvatar from "../../assets/images/default_avatar.png";
import signUpFormReducer, {
  SIGN_UP_UPDATE_AVATAR,
  SIGN_UP_UPDATE_FIRST_NAME,
  SIGN_UP_UPDATE_LAST_NAME,
  SIGN_UP_UPDATE_EMAIL_NAME,
  SIGN_UP_UPDATE_PASSWORD_NAME,
  SIGN_UP_UPDATE_SECOND_PASSWORD,
  signUpInitialState,
} from "./utils/signUp-form-reducer";
import signUpFormValidatorReducer, {
  SIGN_UP_VALIDATE_AVATAR,
  SIGN_UP_VALIDATE_FIRST_NAME,
  SIGN_UP_VALIDATE_LAST_NAME,
  SIGN_UP_VALIDATE_EMAIL_NAME,
  SIGN_UP_VALIDATE_PASSWORD_NAME,
  SIGN_UP_VALIDATE_SECOND_PASSWORD,
  signUpInitialValidatorState,
} from "./utils/signUp-form-validator-reducer";

export default function SignUp() {
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
        .post(`http://localhost:5000/api/users`, {
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          email: newUserData.email,
          password: newUserData.password,
          avatar: newUserData.avatarName
            ? newUserData.avatarName
            : "default_avatar.png",
        })
        .then((response) => console.info(response.statusText))
        .catch((err) => console.error(err));
    } else {
      console.info("Form not validated");
    }
  };

  return (
    <div className="sign-up">
      <form
        className="form-input"
        onSubmit={(e) => {
          e.preventDefault();
          handleNeuUserPost(newUserState);
        }}
      >
        <div className="avatar-label-input-container">
          <label htmlFor="avatar" className="label-avatar">
            Avatar
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="input-avatar"
              onChange={(e) => {
                dispatchForm({
                  type: SIGN_UP_UPDATE_AVATAR,
                  payload: {
                    avatar: e.target.files[0],
                    avatarName: e.target.files[0].name,
                  },
                });
              }}
              onBlur={() =>
                dispatchValidatorForm({
                  type: SIGN_UP_VALIDATE_AVATAR,
                  payload: newUserState,
                })
              }
            />
          </label>
          <div className="avatar-container">
            <img
              src={
                newUserState.avatar
                  ? URL.createObjectURL(newUserState.avatar)
                  : defaultAvatar
              }
              alt="avatar"
            />
          </div>
        </div>
        <label htmlFor="lastName" className="label-last-name">
          Nom
          <input
            type="text"
            name="lastName"
            id="lastName"
            className={
              newUserValidatorState.lastNameError
                ? "error-input"
                : "input-last-name"
            }
            required
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
        </label>
        <label htmlFor="firstName" className="label-first_name">
          Prénom
          <input
            type="text"
            name="firstName"
            id="firstName"
            className={
              newUserValidatorState.firstNameError
                ? "error-input"
                : "input-first-name"
            }
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
        </label>
        <label htmlFor="email" className="label-email">
          E-mail
          <input
            type="email"
            name="email"
            id="email"
            className={
              newUserValidatorState.emailError ? "error-input" : "input-email"
            }
            required
            value={newUserState.email}
            onChange={(e) =>
              dispatchForm({
                type: SIGN_UP_UPDATE_EMAIL_NAME,
                payload: { email: e.target.value },
              })
            }
            onBlur={() =>
              dispatchValidatorForm({
                type: SIGN_UP_VALIDATE_EMAIL_NAME,
                payload: newUserState,
              })
            }
          />
        </label>
        <label htmlFor="password" className="label-password-1">
          Mot de passe
          <input
            type="password"
            name="password"
            id="password"
            className={
              newUserValidatorState.passwordError
                ? "error-input"
                : "input-password-1"
            }
            required
            value={newUserState.password}
            onChange={(e) =>
              dispatchForm({
                type: SIGN_UP_UPDATE_PASSWORD_NAME,
                payload: { password: e.target.value },
              })
            }
            onBlur={() =>
              dispatchValidatorForm({
                type: SIGN_UP_VALIDATE_PASSWORD_NAME,
                payload: newUserState,
              })
            }
          />
        </label>
        <label htmlFor="secondPassword" className="label-password-2">
          Mot de passe
          <input
            type="password"
            name="secondPassword"
            id="secondPassword"
            className={
              newUserValidatorState.secondPasswordError
                ? "error-input"
                : "input-second-password"
            }
            required
            value={newUserState.secondPassword}
            onChange={(e) =>
              dispatchForm({
                type: SIGN_UP_UPDATE_SECOND_PASSWORD,
                payload: { secondPassword: e.target.value },
              })
            }
            onBlur={() =>
              dispatchValidatorForm({
                type: SIGN_UP_VALIDATE_SECOND_PASSWORD,
                payload: newUserState,
              })
            }
          />
        </label>
        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
