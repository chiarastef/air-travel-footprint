import React from "react";
import { AppContext } from "../../context";

export const useChangeTextInputs = () => {
  const { setSearchQueries, setShowDropdown } = React.useContext(AppContext);

  const [isFrom, setIsFrom] = React.useState(null);

  // Set from and to queries:
  // - Show dropdown when user is typing
  // - if it's 'from' input, set isFrom to true (important to set responsive style to dropdown)
  // - Update search queries
  const handleChange = (e) => {
    if (e.target.id === "from") {
      setShowDropdown((prevState) => ({ ...prevState, from: true }));
      setIsFrom(true);
      setSearchQueries((prevState) => ({ ...prevState, from: e.target.value }));
    } else if (e.target.id === "to") {
      setShowDropdown((prevState) => ({ ...prevState, to: true }));
      setIsFrom(false);
      setSearchQueries((prevState) => ({ ...prevState, to: e.target.value }));
    }
  };

  return { isFrom, handleChange };
};
