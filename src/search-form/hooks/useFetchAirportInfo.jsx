import React from "react";
import axios from "axios";
import { AppContext } from "../../context";

import { useGetToken } from "./useGetToken";

export const useFetchAirportInfo = (isFromInput) => {
  const { searchQueries } = React.useContext(AppContext);

  const [airportInfo, setAirportInfo] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);

  const query = isFromInput ? searchQueries.from : searchQueries.to;

  // Get api access token
  const { token } = useGetToken();

  // Airports data from Amadeus Airport & City Search API (https://developers.amadeus.com/self-service/category/air/api-doc/airport-and-city-search)
  React.useEffect(() => {
    setLoaded(false);

    // Call API only after user types at least 3 characters to avoid sending too many requests and get a 429 error
    if (query.length > 2) {
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
          setLoaded(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [query]);

  return { airportInfo, loaded };
};
