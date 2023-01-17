import React from "react";
import { AppContext } from "../../context";

export const useSelectAirport = () => {
  const { setSearchQueries, setShowDropdown } = React.useContext(AppContext);

  // Select airport from dropdown: update search query and hide dropdown
  const selectAirport = (e) => {
    if (e.target.parentNode.id === "fromSuggestions") {
      setSearchQueries((prevState) => ({
        ...prevState,
        from: e.target.innerText,
      }));
      setShowDropdown((prevState) => ({ ...prevState, from: false }));
    } else if (e.target.parentNode.id === "toSuggestions") {
      setSearchQueries((prevState) => ({
        ...prevState,
        to: e.target.innerText,
      }));
      setShowDropdown((prevState) => ({ ...prevState, to: false }));
    }
  };

  return { selectAirport };
};
