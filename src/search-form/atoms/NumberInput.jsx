import React from "react";
import { AppContext } from "../../context";

// Material UI - https://v4.mui.com/
import TextField from "@mui/material/TextField";

import style from "../search-form.module.css";

const NumberInput = () => {
  const { searchQueries, setSearchQueries } = React.useContext(AppContext);

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
        onChange={(e) =>
          setSearchQueries((prevState) => ({
            ...prevState,
            passengers: e.target.value,
          }))
        }
      />
    </div>
  );
};

export default NumberInput;
