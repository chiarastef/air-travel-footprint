import React from "react";

import { reducer } from "./reducer";
import { initialStates } from "./initialStates";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const cabinClasses = ["economy", "premium_economy", "business", "first"];

  const fromInput = React.useRef(null);
  const toInput = React.useRef(null);

  const [state, dispatch] = React.useReducer(reducer, initialStates);

  return (
    <AppContext.Provider
      value={{
        cabinClasses,
        fromInput,
        toInput,
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
