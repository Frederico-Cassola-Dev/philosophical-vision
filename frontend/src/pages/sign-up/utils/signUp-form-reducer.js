export const SIGN_UP_UPDATE_AVATAR = "signUp/updateAvatar";
export const SIGN_UP_UPDATE_FIRST_NAME = "signUp/updateFirstName";
export const SIGN_UP_UPDATE_LAST_NAME = "signUp/updateLastName";
export const SIGN_UP_UPDATE_EMAIL_NAME = "signUp/updateEmail";
export const SIGN_UP_UPDATE_PASSWORD_NAME = "signUp/updatePassword";
export const SIGN_UP_UPDATE_SECOND_PASSWORD = "signUp/updateSecondPassword";

export const signUpInitialState = {
  avatar: null,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  secondPassword: "",
};

export default function signUpFormReducer(state, action) {
  switch (action.type) {
    case SIGN_UP_UPDATE_AVATAR: {
      const { avatar } = action.payload;
      return {
        ...state,
        avatar,
      };
    }
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
    case SIGN_UP_UPDATE_EMAIL_NAME: {
      const { email } = action.payload;
      return {
        ...state,
        email,
      };
    }
    case SIGN_UP_UPDATE_PASSWORD_NAME: {
      const { password } = action.payload;
      return {
        ...state,
        password,
      };
    }
    case SIGN_UP_UPDATE_SECOND_PASSWORD: {
      const { secondPassword } = action.payload;
      return {
        ...state,
        secondPassword,
      };
    }

    default:
      return state;
  }
}
