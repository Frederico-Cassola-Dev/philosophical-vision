import { createContext, useMemo, useReducer } from "react";
import { PropTypes } from "prop-types";
import phrasesReducer, {
  initialState,
} from "../../pages/phrases/utils/phrases-reducer";

export const PhrasesContext = createContext();

export function PhrasesProvider({ children }) {
  const [state, dispatch] = useReducer(phrasesReducer, initialState);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <PhrasesContext.Provider value={value}>{children}</PhrasesContext.Provider>
  );
}

PhrasesProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
