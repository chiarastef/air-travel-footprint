import React from "react";
import axios from "axios";

export const useFetchAirportInfo = (city) => {
  const [info, setInfo] = React.useState([]);

  // Airports data from https://gist.github.com/tdreyno/4278655
  const url =
    "https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json";

  React.useEffect(() => {
    axios
      .get(url)
      .then(function (response) {
        const resp = response.data;
        setInfo(resp.filter((obj) => obj["city"].startsWith(city)));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [city]);

  return [info];
};
