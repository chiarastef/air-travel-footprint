import React from "react";

import { AppContext } from "../../context";

export const useChangeSearchQueries = () => {
  const { setShowResults, setSearchQueries, searchInfo } =
    React.useContext(AppContext);

  //Change search queries after search results appear
  const changeSearchQueries = () => {
    setShowResults(false);
    setSearchQueries(searchInfo);
  };

  return { changeSearchQueries };
};
