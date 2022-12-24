import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import { useFetchAirportCode } from "../hooks/useFetchAirportCode";

import style from "./search-form.module.css";

const SearchForm = () => {
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [isFrom, setIsFrom] = React.useState(null);
  const [passengers, setPassengers] = React.useState(undefined);
  const [cabinClass, setCabinClass] = React.useState("");

  // Dropdown position
  const [top, setTop] = React.useState("");
  const [left, setLeft] = React.useState("");
  const [right, setRight] = React.useState("");

  // Inputs for drowpdown
  const fromInput = React.useRef(null);
  const toInput = React.useRef(null);

  // Set position of dropdown
  const setPosition = (element) => {
    setTop(element.current.getBoundingClientRect().bottom);
    setLeft(element.current.getBoundingClientRect().left);
    setRight(element.current.getBoundingClientRect().right);
  };

  const styleDropdown = {
    top: `${top}px`,
    left: `${left}px`,
    right: `${window.innerWidth - right}px`,
  };

  useEffect(() => {
    setPosition(isFrom ? fromInput : toInput);
    window.addEventListener("resize", () => {
      setPosition(isFrom ? fromInput : toInput);
    });
  }, [fromInput, toInput, isFrom]);

  // Get departure and arrival airports' code
  const [fromCode] = useFetchAirportCode(from);
  const [toCode] = useFetchAirportCode(to);

  // Select airport from dropdown
  const selectItem = (e) => {
    if (e.target.parentNode.id === "fromSuggestions") {
      setFrom(e.target.innerText);
    } else if (e.target.parentNode.id === "toSuggestions") {
      setTo(e.target.innerText);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    if (e.target.id === "from") {
      setIsFrom(true);
      setFrom(e.target.value);
    } else if (e.target.id === "to") {
      setIsFrom(false);
      setTo(e.target.value);
    }
  };

  return (
    <form className={style.searchFormContainer} onSubmit={handleSubmit}>
      <div className={style.formRow}>
        {/* From input */}
        <div className={style.formElement}>
          <TextField
            sx={{ m: 1, width: "100%" }}
            id="from"
            label="From"
            variant="standard"
            size="small"
            required
            value={from}
            onChange={handleChange}
            ref={fromInput}
          />
          {from && fromCode.length > 0 && (
            <div
              id="fromSuggestions"
              className={style.dropdown}
              style={styleDropdown}
            >
              {fromCode.map((item, i) => {
                return (
                  <div key={i} onClick={selectItem}>
                    {item.code} - {item.name} ({item.city})
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* To input */}
        <div className={style.formElement}>
          <TextField
            sx={{ m: 1, width: "100%" }}
            id="to"
            label="To"
            variant="standard"
            size="small"
            required
            value={to}
            onChange={handleChange}
            ref={toInput}
          />
          {to && toCode.length > 0 && (
            <div
              id="toSuggestions"
              className={style.dropdown}
              style={styleDropdown}
            >
              {toCode.map((item, i) => {
                return (
                  <div key={i} onClick={selectItem}>
                    {item.code} - {item.name} ({item.city})
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className={style.formRow}>
        {/* Passengers input */}
        <div className={style.formElement}>
          <TextField
            sx={{ m: 1, width: "100%" }}
            type="number"
            id="passengers"
            label="Number of passengers"
            variant="standard"
            size="small"
            required
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          />
        </div>
        {/* Cabin class input */}
        <div className={style.formElement}>
          <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Cabin class
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="cabin-class"
              required
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              label="Cabin class"
            >
              <MenuItem value="economy">economy</MenuItem>
              <MenuItem value="premium_economy">premium economy</MenuItem>
              <MenuItem value="business">business</MenuItem>
              <MenuItem value="first">first</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Button type="submit" variant="contained" sx={{ mt: 3, width: "100%" }}>
        calculate
      </Button>
    </form>
  );
};

export default SearchForm;
