import React from "react";
import axios from "axios";
import { AppContext } from "../../context";

export const useFetchFootprint = () => {
  const { state } = React.useContext(AppContext);
  const { showResults, airportsCodes, searchInfo } = state;

  const [footprint, setFootprint] = React.useState(null);
  const [totalFootprint, setTotalFootprint] = React.useState(null);
  const [footprintLoaded, setFootprintLoaded] = React.useState(false);

  // GoClimate API - https://api.goclimate.com/docs
  React.useEffect(() => {
    // Fetch data only when results is showing
    if (showResults) {
      setFootprintLoaded(false);

      axios
        .get(
          `https://api.goclimate.com/v1/flight_footprint?segments[0][origin]=${airportsCodes.origin}&segments[0][destination]=${airportsCodes.destination}&cabin_class=${searchInfo.cabinClass}&&currencies[]=EUR`,
          {
            auth: {
              username: import.meta.env.VITE_GOCLIMATE_API_KEY,
            },
          }
        )
        .then(function (response) {
          setFootprint(response.data.footprint);
          setTotalFootprint(
            response.data.footprint * state.searchInfo.passengers
          );
          setFootprintLoaded(true);
        })
        .catch(function (error) {
          setFootprintLoaded(true);
          console.log(error);
        });
    }
  }, [state.airportsCodes, state.searchInfo.cabinClass]);

  return { footprint, totalFootprint, footprintLoaded };
};
