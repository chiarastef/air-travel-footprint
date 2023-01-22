import React from "react";
import { nanoid } from "nanoid";
import { AppContext } from "../../context";

// Material UI - https://v4.mui.com/
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import style from "../search-form.module.css";

const SelectInput = ({ handleChange }) => {
  const { cabinClasses, state } = React.useContext(AppContext);
  const { searchQueries } = state;

  return (
    <div className={style.formElement}>
      <FormControl
        id="cabinClass"
        variant="standard"
        sx={{ m: 1, width: "100%" }}
      >
        <InputLabel id="demo-simple-select-standard-label">
          Cabin class
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          required
          value={searchQueries.cabinClass}
          onChange={handleChange}
          label="Cabin class"
        >
          {cabinClasses.map((cabinClass) => {
            const formattedCabinClass =
              cabinClass === "premium_economy" ? "premium economy" : cabinClass;
            return (
              <MenuItem key={nanoid()} value={cabinClass}>
                {formattedCabinClass}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
