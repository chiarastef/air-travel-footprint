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
  const [showFromDropdown, setShowFromDropdown] = React.useState(false);
  const [to, setTo] = React.useState("");
  const [showToDropdown, setShowToDropdown] = React.useState(false);
  const [isFrom, setIsFrom] = React.useState(null);
  const [passengers, setPassengers] = React.useState("");
  const [cabinClass, setCabinClass] = React.useState("");
  const [codes, setCodes] = React.useState(null);
  const [searchQueries, setSearchQueries] = React.useState({});
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

  // Select input to get size for dropdown
  React.useEffect(() => {
    const selectInput = () => {
      setPosition(isFrom ? fromInput : toInput);
    };

    selectInput();
    window.addEventListener("resize", selectInput);

    return () => window.removeEventListener("resize", selectInput);
  }, [isFrom]);

  // Select airport from dropdown
  const selectAirport = (e) => {
    if (e.target.parentNode.id === "fromSuggestions") {
      setFrom(e.target.innerText);
      setShowFromDropdown(false);
    } else if (e.target.parentNode.id === "toSuggestions") {
      setTo(e.target.innerText);
      setShowToDropdown(false);
    }
  };

  // Hide dropdown suggestions when user clicks elsewhere
  React.useEffect(() => {
    const hideDropdown = (e) => {
      if (e.target.id == !"from" || e.target.id == !"to") {
        setShowFromDropdown(false);
        setShowToDropdown(false);
      }
    };
    // Add event listener only if dropdown is showing
    if (showFromDropdown || showToDropdown) {
      document.addEventListener("click", hideDropdown);
    }

    return () => document.removeEventListener("click", hideDropdown);
  }, [showFromDropdown, showToDropdown]);

  // Set from and to queries
  const handleChange = (e) => {
    if (e.target.id === "from") {
      setShowFromDropdown(true);
      setIsFrom(true);
      setFrom(e.target.value);
    } else if (e.target.id === "to") {
      setShowToDropdown(true);
      setIsFrom(false);
      setTo(e.target.value);
    }
  };

  // Calculate footprint and show results
  const handleSubmit = (e) => {
    e.preventDefault();
    // Set codes to get footprint info
    setCodes({
      origin: from.slice(0, 3),
      destination: to.slice(0, 3),
    });
    // Set queries to send to results component
    setSearchQueries({
      from,
      to,
      passengers,
      cabinClass,
    });
    // Show results info
    setShowResults(true);
    // Reset form
    setFrom("");
    setTo("");
    setPassengers("");
    setCabinClass("");
  };

  // Change search queries after search results appear
  const changeSearchQueries = () => {
    setShowResults(false);

    setFrom(searchQueries.from);
    setTo(searchQueries.to);
    setPassengers(searchQueries.passengers);
    setCabinClass(searchQueries.cabinClass);
  };

  // New Search
  const setNewSearch = () => {
    setShowResults(false);
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
            {/* From dropdown */}
            {from && showFromDropdown && (
              <ul
                id="fromSuggestions"
                className={style.dropdown}
                style={styleDropdown}
              >
                <Dropdown
                  token={token}
                  query={from}
                  selectAirport={selectAirport}
                />
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
            {/* To dropdown */}
            {to && showToDropdown && (
              <ul
                id="toSuggestions"
                className={style.dropdown}
                style={styleDropdown}
              >
                <Dropdown
                  token={token}
                  query={to}
                  selectAirport={selectAirport}
                />
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
      {/* Results */}
      {showResults && (
        <Results
          codes={codes}
          searchQueries={searchQueries}
          changeSearchQueries={changeSearchQueries}
          setNewSearch={setNewSearch}
        />
      )}
    </>
  );
};

export default SearchForm;
