export const SIGN_UP_VALIDATE_AVATAR = "signUp/validateAvatar";
export const SIGN_UP_VALIDATE_FIRST_NAME = "signUp/validateFirstName";
export const SIGN_UP_VALIDATE_LAST_NAME = "signUp/validateLastName";
export const SIGN_UP_VALIDATE_EMAIL_NAME = "signUp/validateEmail";
export const SIGN_UP_VALIDATE_PASSWORD_NAME = "signUp/validatePassword";
export const SIGN_UP_VALIDATE_SECOND_PASSWORD = "signUp/validateSecondPassword";

export const signUpInitialValidatorState = {
  avatarError: false,
  firstNameError: false,
  lastNameError: false,
  emailError: false,
  passwordError: false,
  secondPasswordError: false,
  isFormValid: false,
};

export default function signUpFormValidatorReducer(state, action) {
  let isValid = false;
  switch (action.type) {
    case SIGN_UP_VALIDATE_AVATAR:
      isValid = action.payload.avatarName.length > 0;
      return {
        ...state,
        ...{
          avatarError: !isValid,
          isFormValid:
            isValid &&
            !state.firstNameError &&
            !state.lastNameError &&
            !state.emailError &&
            !state.passwordError &&
            !state.secondPasswordError,
        },
      };
    case SIGN_UP_VALIDATE_FIRST_NAME:
      isValid = action.payload.firstName.length > 0;
      return {
        ...state,
        ...{
          firstNameError: !isValid,
          isFormValid:
            isValid &&
            !state.avatarError &&
            !state.lastNameError &&
            !state.emailError &&
            !state.passwordError &&
            !state.secondPasswordError,
        },
      };
    case SIGN_UP_VALIDATE_LAST_NAME:
      isValid = action.payload.lastName.length > 0;
      return {
        ...state,
        ...{
          lastNameError: !isValid,
          isFormValid:
            isValid &&
            !state.avatarError &&
            !state.firstNameError &&
            !state.emailError &&
            !state.passwordError &&
            !state.secondPasswordError,
        },
      };
    case SIGN_UP_VALIDATE_EMAIL_NAME:
      isValid = !!(
        action.payload.email.length > 0 && action.payload.email.includes("@")
      );

      return {
        ...state,
        ...{
          emailError: !isValid,
          isFormValid:
            isValid &&
            !state.avatarError &&
            !state.firstNameError &&
            !state.lastNameError &&
            !state.passwordError &&
            !state.secondPasswordError,
        },
      };
    case SIGN_UP_VALIDATE_PASSWORD_NAME:
      isValid = action.payload.password.length > 9;
      return {
        ...state,
        ...{
          passwordError: !isValid,
          isFormValid:
            isValid &&
            !state.avatarError &&
            !state.firstNameError &&
            !state.lastNameError &&
            !state.emailError &&
            !state.secondPasswordError,
        },
      };
    case SIGN_UP_VALIDATE_SECOND_PASSWORD:
      isValid = action.payload.secondPassword.length > 9;

      return {
        ...state,
        ...{
          secondPasswordError: !isValid,
          isFormValid:
            isValid &&
            !state.avatarError &&
            !state.firstNameError &&
            !state.lastNameError &&
            !state.emailError &&
            !state.passwordError,
        },
      };
    default:
      return state;
  }
}
