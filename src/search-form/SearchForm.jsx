import React from "react";

// Material UI - https://v4.mui.com/
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import { useGetToken } from "../hooks/useGetToken";

import Dropdown from "../dropdown/dropdown";
import Results from "../results/results";
import style from "./search-form.module.css";

const SearchForm = () => {
  const [from, setFrom] = React.useState("");
  const [isFromSelected, setIsFromSelected] = React.useState(false);
  const [to, setTo] = React.useState("");
  const [isToSelected, setIsToSelected] = React.useState(false);
  const [isFrom, setIsFrom] = React.useState(null);
  const [passengers, setPassengers] = React.useState("");
  const [cabinClass, setCabinClass] = React.useState("");
  const [codes, setCodes] = React.useState(null);
  const [searchData, setSearchData] = React.useState({});
  const [showResults, setShowResults] = React.useState(false);

  // Get api access token
  const { token } = useGetToken();

  // Inputs for drowpdown suggestions
  const fromInput = React.useRef(null);
  const toInput = React.useRef(null);

  // Dropdown suggestions position
  const [top, setTop] = React.useState("");
  const [left, setLeft] = React.useState("");
  const [right, setRight] = React.useState("");

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

  React.useEffect(() => {
    setPosition(isFrom ? fromInput : toInput);
    window.addEventListener("resize", () => {
      setPosition(isFrom ? fromInput : toInput);
    });
  }, [isFrom]);

  // Select airport from dropdown
  const selectItem = (e) => {
    if (e.target.parentNode.id === "fromSuggestions") {
      setFrom(e.target.innerText);
      setIsFromSelected(true);
    } else if (e.target.parentNode.id === "toSuggestions") {
      setTo(e.target.innerText);
      setIsToSelected(true);
    }
  };

  const handleChange = (e) => {
    // Capitalized first letter of query
    const query = e.target.value;
    const firstLetter = query.charAt(0).toUpperCase();
    const queryCapitalized = firstLetter + query.substring(1);

    if (e.target.id === "from") {
      setIsFromSelected(false);
      setIsFrom(true);
      setFrom(queryCapitalized);
    } else if (e.target.id === "to") {
      setIsToSelected(false);
      setIsFrom(false);
      setTo(queryCapitalized);
    }
  };

  // Calculate footprint and show results
  const handleSubmit = (e) => {
    e.preventDefault();

    setCodes({
      origin: from.slice(0, 3),
      destination: to.slice(0, 3),
    });

    setSearchData({
      from,
      to,
      passengers,
      cabinClass,
    });

    setShowResults(true);

    // Reset form
    setFrom("");
    setTo("");
    setPassengers("");
    setCabinClass("");
  };

  return (
    <>
      <form className={style.searchFormContainer} onSubmit={handleSubmit}>
        <div className={style.formRow}>
          {/* From input */}
          <div className={style.formElement}>
            <TextField
              sx={{ m: 1, width: "100%" }}
              id="from"
              label="From (city or airport)"
              variant="standard"
              size="small"
              required
              value={from}
              onChange={handleChange}
              ref={fromInput}
            />
            {from && !isFromSelected && (
              <ul
                id="fromSuggestions"
                className={style.dropdown}
                style={styleDropdown}
              >
                <Dropdown token={token} query={from} selectItem={selectItem} />
              </ul>
            )}
          </div>
          {/* To input */}
          <div className={style.formElement}>
            <TextField
              sx={{ m: 1, width: "100%" }}
              id="to"
              label="To (city or airport)"
              variant="standard"
              size="small"
              required
              value={to}
              onChange={handleChange}
              ref={toInput}
            />
            {to && !isToSelected && (
              <ul
                id="toSuggestions"
                className={style.dropdown}
                style={styleDropdown}
              >
                <Dropdown token={token} query={to} selectItem={selectItem} />
              </ul>
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
      {showResults && <Results codes={codes} searchData={searchData} />}
    </>
  );
};

export default SearchForm;
