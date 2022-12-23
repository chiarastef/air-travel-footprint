import React from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  return <AppContext.Provider value={"hello"}>{children}</AppContext.Provider>;
};

// Custom hook to pass values
export const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { AppProvider };
