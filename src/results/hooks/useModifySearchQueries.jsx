import React from "react";
import { AppContext } from "../../context";

export const useModifySearchQueries = () => {
  const { dispatch } = React.useContext(AppContext);

  const modifySearchQuery = () => {
    dispatch({ type: "MODIFY_SEARCH_QUERIES" });
  };

  return { modifySearchQuery };
};
