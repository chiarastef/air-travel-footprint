import React from "react";
import { nanoid } from "nanoid";
import BeatLoader from "react-spinners/BeatLoader";

import { useFetchAirportInfo } from "../hooks/useFetchAirportInfo";

import style from "../search-form.module.css";

const dropdown = ({ styleDropdown, isFromInput, selectAirport }) => {
  // Get departure and arrival airports' info
  const { airportInfo, loaded } = useFetchAirportInfo(isFromInput);

  if (!loaded) {
    return (
      <ul
        id={isFromInput ? "fromSuggestions" : "toSuggestions"}
        className={style.dropdown}
        style={styleDropdown}
      >
        <BeatLoader
          color={"#1565c0"}
          loading={true}
          cssOverride={{ textAlign: "center" }}
          size={8}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </ul>
    );
  }

  if (airportInfo.length < 1) {
    return (
      <ul
        id={isFromInput ? "fromSuggestions" : "toSuggestions"}
        className={style.dropdown}
        style={styleDropdown}
      >
        <li>No results</li>
      </ul>
    );
  }

  return (
    <ul
      id={isFromInput ? "fromSuggestions" : "toSuggestions"}
      className={style.dropdown}
      style={styleDropdown}
    >
      {airportInfo.map((item) => {
        return (
          <li key={nanoid()} onClick={selectAirport}>
            {item.iataCode} - {item.name} ({item.address.cityName})
          </li>
        );
      })}
    </ul>
  );
};

export default dropdown;
