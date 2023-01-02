import React from "react";
import axios from "axios";

export const useFetchAirportInfo = (city) => {
  const [info, setInfo] = React.useState([]);
  const [token, setToken] = React.useState("");

  // Get api access token
  React.useEffect(() => {
    console.log("token");
    fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${
        import.meta.env.VITE_AIRLABS_API_KEY
      }&client_secret=${import.meta.env.VITE_AIRLABS_API_SECRET}`,
    })
      .then((response) => response.json())
      .then((data) => setToken(data.access_token));
  }, []);

  // Airports data from Amadeus Airport & City Search API (https://developers.amadeus.com/self-service/category/air/api-doc/airport-and-city-search)
  React.useEffect(() => {
    if (city.length > 0) {
      axios
        .get(
          `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${city}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          const resp = response.data.data;
          setInfo(resp);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [city]);

  return [info];
};
