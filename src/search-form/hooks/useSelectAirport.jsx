import React from "react";
import { AppContext } from "../../context";

export const useSelectAirport = () => {
  const { dispatch } = React.useContext(AppContext);

  // Select airport from dropdown
  const selectAirport = (e) => {
    if (e.target.parentNode.id === "fromSuggestions") {
      dispatch({ type: "SELECT_FROM_AIRPORT", value: e.target.innerText });
    } else if (e.target.parentNode.id === "toSuggestions") {
      dispatch({ type: "SELECT_TO_AIRPORT", value: e.target.innerText });
    }
  };

  return { selectAirport };
};
