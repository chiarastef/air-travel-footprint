import React from "react";
import { AppContext } from "../../context";

export const useSearchFlight = () => {
  const { dispatch } = React.useContext(AppContext);

  // Set data to search footprint and show results
  const searchFlight = (e) => {
    e.preventDefault();
    dispatch({ type: "SEARCH_FLIGHT" });
  };

  return { searchFlight };
};
