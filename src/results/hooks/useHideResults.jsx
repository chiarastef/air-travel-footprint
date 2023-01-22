import React from "react";
import { AppContext } from "../../context";

export const useHideResults = () => {
  const { dispatch } = React.useContext(AppContext);

  const hideResults = () => {
    dispatch({ type: "HIDE_RESULTS" });
  };

  return { hideResults };
};
