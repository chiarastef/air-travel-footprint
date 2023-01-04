import React from "react";
import { nanoid } from "nanoid";
import BeatLoader from "react-spinners/BeatLoader";

import { useFetchAirportInfo } from "../hooks/useFetchAirportInfo";

const dropdown = ({ token, query, selectAirport }) => {
  // Get departure and arrival airports' info
  const { airportInfo, loaded } = useFetchAirportInfo(query, token);

  if (!loaded) {
    return (
      <BeatLoader
        color={"#1565c0"}
        loading={true}
        cssOverride={{ textAlign: "center" }}
        size={8}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  if (airportInfo.length < 1) {
    return <li>No results</li>;
  }

  return (
    <>
      {airportInfo.map((item) => {
        return (
          <li key={nanoid()} onClick={selectAirport}>
            {item.iataCode} - {item.name} ({item.address.cityName})
          </li>
        );
      })}
    </>
  );
};

export default dropdown;
