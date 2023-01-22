import React from "react";
import { AppContext } from "../../context";

// Material UI - https://v4.mui.com/
import TextField from "@mui/material/TextField";

import style from "../search-form.module.css";

const NumberInput = ({ handleChange }) => {
  const { state } = React.useContext(AppContext);
  const { searchQueries } = state;

  return (
    <div className={style.formElement}>
      <TextField
        sx={{ m: 1, width: "100%" }}
        type="number"
        id="passengers"
        label="Number of passengers"
        variant="standard"
        size="small"
        required
        value={searchQueries.passengers}
        onChange={handleChange}
      />
    </div>
  );
};

export default NumberInput;
