import React from "react";
import { nanoid } from "nanoid";

import { useFetchAirportInfo } from "../hooks/useFetchAirportInfo";

const dropdown = ({ token, query, selectItem }) => {
  // Get departure and arrival airports' info
  const { airportInfo } = useFetchAirportInfo(query, token);

  // Show list only if there are results
  if (airportInfo.length > 0) {
    return (
      <>
        {airportInfo.map((item) => {
          return (
            <li key={nanoid()} onClick={selectItem}>
              {item.iataCode} - {item.name} ({item.address.cityName})
            </li>
          );
        })}
      </>
    );
  } else {
    return <li>No results</li>;
  }
};

export default dropdown;
