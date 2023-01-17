import React from "react";
import { AppContext } from "../../context";

// Material UI - https://v4.mui.com/
import TextField from "@mui/material/TextField";

import style from "../search-form.module.css";

const TextInput = ({ isFromInput, handleChange }) => {
  const { fromInput, toInput, searchQueries } = React.useContext(AppContext);

  return (
    <div className={style.formElement}>
      <TextField
        sx={{ m: 1, width: "100%" }}
        id={isFromInput ? "from" : "to"}
        label={`${isFromInput ? "From" : "To"} (city or airport)`}
        variant="standard"
        size="small"
        required
        value={isFromInput ? searchQueries.from : searchQueries.to}
        onChange={handleChange}
        ref={isFromInput ? fromInput : toInput}
      />
    </div>
  );
};

export default TextInput;
