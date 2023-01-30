import React from "react";
import { AppContext } from "../../context";

export const useUpdateInputs = () => {
  const { cabinClasses, dispatch } = React.useContext(AppContext);

  // Set from, to  and passengers queries
  const updateInputs = (e) => {
    if (e.target.id === "from") {
      dispatch({ type: "SET_FROM", value: e.target.value });
    } else if (e.target.id === "to") {
      dispatch({ type: "SET_TO", value: e.target.value });
    } else if (e.target.id === "passengers") {
      dispatch({ type: "SET_PASSENGERS", value: e.target.value });
    } else if (cabinClasses.includes(e.target.value)) {
      dispatch({ type: "SET_CABIN_CLASS", value: e.target.value });
    }
  };

  return { updateInputs };
};
