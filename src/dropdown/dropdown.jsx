import React from "react";
import { nanoid } from "nanoid";

import { useFetchAirportInfo } from "../hooks/useFetchAirportInfo";

const dropdown = ({ token, query, selectItem }) => {
  // Get departure and arrival airports' Info
  const [flightInfo] = useFetchAirportInfo(query, token);

  return (
    <>
      {flightInfo.map((item) => {
        return (
          <li key={nanoid()} onClick={selectItem}>
            {item.iataCode} - {item.name} ({item.address.cityName})
          </li>
        );
      })}
    </>
  );
};

export default dropdown;
