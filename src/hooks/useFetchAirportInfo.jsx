import React from "react";
import axios from "axios";

export const useFetchAirportInfo = (query, token) => {
  const [airportInfo, setAirportInfo] = React.useState([]);

  // Airports data from Amadeus Airport & City Search API (https://developers.amadeus.com/self-service/category/air/api-doc/airport-and-city-search)
  React.useEffect(() => {
    if (query.length > 0) {
      axios
        .get(
          `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          setAirportInfo(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [query]);

  return { airportInfo };
};
