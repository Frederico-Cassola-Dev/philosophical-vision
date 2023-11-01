import style from "./myAccount.module.scss";

export default function MyAccount() {
  return (
    <div className={style.myAccount}>
      <form
        className={style.formInput}
        onSubmit={(e) => {
          e.preventDefault();
          // handleNeuUserPost(newUserState);
          // TODO - navigate to phrases with the new user
        }}
      >
        <label htmlFor="lastName" className={style.labelLastName}>
          Nom
          <input
            type="text"
            name="lastName"
            id="lastName"
            // className={
            //   newUserValidatorState.lastNameError
            //     ? style.errorInput
            //     : style.inputLastName
            // }
            // required
            // value={newUserState.lastName}
            // onChange={(e) =>
            //   dispatchForm({
            //     type: SIGN_UP_UPDATE_LAST_NAME,
            //     payload: { lastName: e.target.value },
            //   })
            // }
            // onBlur={() =>
            //   dispatchValidatorForm({
            //     type: SIGN_UP_VALIDATE_LAST_NAME,
            //     payload: newUserState,
            //   })
            // }
          />
        </label>
        <label htmlFor="firstName" className={style.labelFirstName}>
          Prénom
          <input
            type="text"
            name="firstName"
            id="firstName"
            // className={
            //   newUserValidatorState.firstNameError
            //     ? style.errorInput
            //     : style.inputFirstName
            // }
            // required
            // value={newUserState.firstName}
            // onChange={(e) =>
            //   dispatchForm({
            //     type: SIGN_UP_UPDATE_FIRST_NAME,
            //     payload: { firstName: e.target.value },
            //   })
            // }
            // onBlur={() =>
            //   dispatchValidatorForm({
            //     type: SIGN_UP_VALIDATE_FIRST_NAME,
            //     payload: newUserState,
            //   })
            // }
          />
        </label>
        <label htmlFor="email" className={style.labelEmail}>
          E-mail
          <input
            type="email"
            name="email"
            id="email"
            // className={
            //   newUserValidatorState.emailError
            //     ? style.errorInput
            //     : style.inputEmail
            // }
            // required
            // value={newUserState.email}
            // onChange={(e) =>
            //   dispatchForm({
            //     type: SIGN_UP_UPDATE_EMAIL_NAME,
            //     payload: { email: e.target.value },
            //   })
            // }
            // onBlur={() =>
            //   dispatchValidatorForm({
            //     type: SIGN_UP_VALIDATE_EMAIL_NAME,
            //     payload: newUserState,
            //   })
            // }
          />
        </label>
        <label htmlFor="password" className={style.labelPassword1}>
          Mot de passe
          <input
            type="password"
            name="password"
            id="password"
            // className={
            //   newUserValidatorState.passwordError
            //     ? style.errorInput
            //     : style.inputPassword1
            // }
            // required
            // value={newUserState.password}
            // onChange={(e) =>
            //   dispatchForm({
            //     type: SIGN_UP_UPDATE_PASSWORD_NAME,
            //     payload: { password: e.target.value },
            //   })
            // }
            // onBlur={() =>
            //   dispatchValidatorForm({
            //     type: SIGN_UP_VALIDATE_PASSWORD_NAME,
            //     payload: newUserState,
            //   })
            // }
          />
        </label>
        <label htmlFor="secondPassword" className={style.labelPassword2}>
          Mot de passe
          <input
            type="password"
            name="secondPassword"
            id="secondPassword"
            // className={
            //   newUserValidatorState.secondPasswordError
            //     ? style.errorInput
            //     : style.inputSecondPassword
            // }
            // required
            // value={newUserState.secondPassword}
            // onChange={(e) =>
            //   dispatchForm({
            //     type: SIGN_UP_UPDATE_SECOND_PASSWORD,
            //     payload: { secondPassword: e.target.value },
            //   })
            // }
            // onBlur={() =>
            //   dispatchValidatorForm({
            //     type: SIGN_UP_VALIDATE_SECOND_PASSWORD,
            //     payload: newUserState,
            //   })
            // }
          />
        </label>
        <div className={style.submitButtonContainer}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
