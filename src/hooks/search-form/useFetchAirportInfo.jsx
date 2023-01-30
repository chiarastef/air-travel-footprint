import React from "react";
import axios from "axios";
import { AppContext } from "../../context";

export const useFetchAirportInfo = (isFromInput) => {
  const { state } = React.useContext(AppContext);
  const { searchQueries, showDropdown } = state;

  const [airportInfo, setAirportInfo] = React.useState([]);
  const [airportInfoLoaded, setAirportInfoLoaded] = React.useState(false);

  const query = isFromInput ? searchQueries.from : searchQueries.to;
  const capitalizedQuery = query.charAt(0).toUpperCase() + query.slice(1);

  const isDropdownShowing = isFromInput ? showDropdown.from : showDropdown.to;

  // Airport Codes from https://gist.github.com/tdreyno/4278655
  React.useEffect(() => {
    // Fetch data only when dropdown is showing
    if (isDropdownShowing) {
      setAirportInfoLoaded(false);

      axios
        .get(
          "https://gist.githubusercontent.com/tdreyno/4278655/raw/755b1cfc5ded72d7b45f97b9c7295d525be18780/airports.json"
        )
        .then((resp) => {
          setAirportInfo(
            resp.data.filter((el) => el.city.startsWith(capitalizedQuery))
          );
          setAirportInfoLoaded(true);
        })
        .catch((error) => {
          setAirportInfoLoaded(true);
          console.log(error);
        });
    }
  }, [query]);

  return { airportInfo, airportInfoLoaded };
};
