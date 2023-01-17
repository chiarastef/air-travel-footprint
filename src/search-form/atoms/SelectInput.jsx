import React from "react";
import { AppContext } from "../../context";

// Material UI - https://v4.mui.com/
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import style from "../search-form.module.css";

const SelectInput = () => {
  const { searchQueries, setSearchQueries } = React.useContext(AppContext);

  return (
    <div className={style.formElement}>
      <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
        <InputLabel id="demo-simple-select-standard-label">
          Cabin class
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="cabin-class"
          required
          value={searchQueries.cabinClass}
          onChange={(e) =>
            setSearchQueries((prevState) => ({
              ...prevState,
              cabinClass: e.target.value,
            }))
          }
          label="Cabin class"
        >
          <MenuItem value="economy">economy</MenuItem>
          <MenuItem value="premium_economy">premium economy</MenuItem>
          <MenuItem value="business">business</MenuItem>
          <MenuItem value="first">first</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
