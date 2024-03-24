export const INPUT_KNOWN_NAME = "inputKnownName";
export const INPUT_FIRST_NAME = "inputFirstName";
export const INPUT_LAST_NAME = "inputLastName";
export const INPUT_PERIOD_ID = "inputPeriodId";
export const INPUT_PHILO_CURRENT = "inputPhiloCurrent";
export const INPUT_BORN_DATE = "inputBornDate";
export const INPUT_DEAD_DATE = "inputDeadDate";
export const INPUT_ERA = "imputEra";
export const RESET = "reset";

export const initialState = {
  knownName: "",
  firstName: "",
  lastName: "",
  periodId: "",
  philoCurrent: "",
  bornDate: "",
  deadDate: "",
  era: "",
};

export default function newAuthorReducer(state, action) {
  switch (action.type) {
    case INPUT_KNOWN_NAME: {
      const { knownName } = action.payload;
      return {
        ...state,
        knownName,
      };
    }

    case INPUT_FIRST_NAME: {
      const { firstName } = action.payload;
      return {
        ...state,
        firstName,
      };
    }

    case INPUT_LAST_NAME: {
      const { lastName } = action.payload;
      return {
        ...state,
        lastName,
      };
    }

    case INPUT_PERIOD_ID: {
      const { periodId } = action.payload;
      return {
        ...state,
        periodId,
      };
    }

    case INPUT_PHILO_CURRENT: {
      const { philoCurrent } = action.payload;
      return {
        ...state,
        philoCurrent,
      };
    }

    case INPUT_BORN_DATE: {
      const { bornDate } = action.payload;
      return {
        ...state,
        bornDate,
      };
    }

    case INPUT_DEAD_DATE: {
      const { deadDate } = action.payload;
      return {
        ...state,
        deadDate,
      };
    }

    case INPUT_ERA: {
      const { era } = action.payload;
      return {
        ...state,
        era,
      };
    }

    case RESET: {
      return initialState;
    }

    default:
      return state;
  }
}
