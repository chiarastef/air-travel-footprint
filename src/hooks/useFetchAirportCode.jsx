import React from "react";
import axios from "axios";

export const useFetchAirportCode = (city) => {
  const [code, setCode] = React.useState([]);

  const url =
    "https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json";

  React.useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        // handle success
        const resp = response.data;
        setCode(resp.filter((obj) => obj["city"].startsWith(city)));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [city]);

  return [code];
};
