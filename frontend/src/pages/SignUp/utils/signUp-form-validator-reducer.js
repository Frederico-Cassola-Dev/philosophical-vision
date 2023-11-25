export const SIGN_UP_VALIDATE_FIRST_NAME = "signUp/validateFirstName";
export const SIGN_UP_VALIDATE_LAST_NAME = "signUp/validateLastName";
export const SIGN_UP_VALIDATE_EMAIL = "signUp/validateEmail";
export const SIGN_UP_VALIDATE_PASSWORD = "signUp/validatePassword";
export const SIGN_UP_VALIDATE_CONFIRM_PASSWORD =
  "signUp/validateConfirmPassword";
export const SIGN_UP_VALIDATE_PASSWORD_MATCH = "signUp/validatePasswordMatch";

export const signUpInitialValidatorState = {
  firstNameError: false,
  lastNameError: false,
  emailError: false,
  passwordError: false,
  confirmPasswordError: false,
  passwordsMatchError: false,
  isFormValid: false,
};

export default function signUpFormValidatorReducer(state, action) {
  let isValid = false;
  switch (action.type) {
    case SIGN_UP_VALIDATE_FIRST_NAME:
      isValid = !!(
        action.payload.firstName.length > 0 &&
        action.payload.firstName.match(/\s/) === null
      );
      return {
        ...state,
        ...{
          firstNameError: !isValid,
          isFormValid:
            isValid &&
            !state.lastNameError &&
            !state.emailError &&
            !state.passwordError &&
            !state.confirmPasswordError &&
            !state.passwordsMatch,
        },
      };
    case SIGN_UP_VALIDATE_LAST_NAME:
      isValid = !!(
        action.payload.lastName.length > 0 &&
        action.payload.lastName.match(/\s/) === null
      );
      return {
        ...state,
        ...{
          lastNameError: !isValid,
          isFormValid:
            isValid &&
            !state.firstNameError &&
            !state.emailError &&
            !state.passwordError &&
            !state.confirmPasswordError &&
            !state.passwordsMatch,
        },
      };
    case SIGN_UP_VALIDATE_EMAIL: {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      isValid = !!(
        action.payload.email.length > 0 && emailRegex.test(action.payload.email)
      );

      return {
        ...state,
        ...{
          emailError: !isValid,
          isFormValid:
            isValid &&
            !state.firstNameError &&
            !state.lastNameError &&
            !state.passwordError &&
            !state.confirmPasswordError &&
            !state.passwordsMatch,
        },
      };
    }
    case SIGN_UP_VALIDATE_PASSWORD: {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;

      isValid = passwordRegex.test(action.payload.password);
      return {
        ...state,
        ...{
          passwordError: !isValid,
          isFormValid:
            isValid &&
            !state.firstNameError &&
            !state.lastNameError &&
            !state.emailError &&
            !state.confirmPasswordError &&
            !state.passwordsMatch,
        },
      };
    }
    case SIGN_UP_VALIDATE_CONFIRM_PASSWORD: {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{9,}$/;
      isValid = passwordRegex.test(action.payload.confirmPassword);

      return {
        ...state,
        ...{
          confirmPasswordError: !isValid,
          isFormValid:
            isValid &&
            !state.firstNameError &&
            !state.lastNameError &&
            !state.emailError &&
            !state.passwordError &&
            !state.passwordsMatch,
        },
      };
    }
    case SIGN_UP_VALIDATE_PASSWORD_MATCH: {
      isValid = action.payload.passwordsMatch;

      return {
        ...state,
        ...{
          passwordsMatch: !isValid,
          isFormValid:
            isValid &&
            !state.firstNameError &&
            !state.lastNameError &&
            !state.emailError &&
            !state.passwordError &&
            !state.confirmPasswordError,
        },
      };
    }
    default:
      return state;
  }
}
