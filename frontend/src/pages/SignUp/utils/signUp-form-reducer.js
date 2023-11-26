export const SIGN_UP_UPDATE_FIRST_NAME = "signUp/updateFirstName";
export const SIGN_UP_UPDATE_LAST_NAME = "signUp/updateLastName";
export const SIGN_UP_UPDATE_EMAIL = "signUp/updateEmail";
export const SIGN_UP_UPDATE_EMAIL_MESSAGE = "signUp/updateEmailMessage";
export const SIGN_UP_UPDATE_PASSWORD = "signUp/updatePassword";
export const SIGN_UP_UPDATE_CONFIRM_PASSWORD = "signUp/updateConfirmPassword";
export const SIGN_UP_UPDATE_PASSWORDS_MATCH = "signUp/updatePasswordsMatch";

export const signUpInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  emailMessage: "",
  password: "",
  confirmPassword: "",
  passwordsMatch: false,
};

export default function signUpFormReducer(state, action) {
  switch (action.type) {
    case SIGN_UP_UPDATE_FIRST_NAME: {
      const { firstName } = action.payload;
      return {
        ...state,
        firstName,
      };
    }
    case SIGN_UP_UPDATE_LAST_NAME: {
      const { lastName } = action.payload;
      return {
        ...state,
        lastName,
      };
    }
    case SIGN_UP_UPDATE_EMAIL: {
      const { email } = action.payload;
      return {
        ...state,
        email,
      };
    }
    case SIGN_UP_UPDATE_EMAIL_MESSAGE: {
      const { emailMessage } = action.payload;

      return {
        ...state,
        emailMessage,
      };
    }
    case SIGN_UP_UPDATE_PASSWORD: {
      const { password } = action.payload;
      return {
        ...state,
        password,
      };
    }
    case SIGN_UP_UPDATE_CONFIRM_PASSWORD: {
      const { confirmPassword } = action.payload;
      return {
        ...state,
        confirmPassword,
      };
    }
    case SIGN_UP_UPDATE_PASSWORDS_MATCH: {
      const { passwordsMatch } = action.payload;
      return {
        ...state,
        passwordsMatch,
      };
    }

    default:
      return state;
  }
}
