import React from "react";
import axios from "axios";
import { AppContext } from "../../context";

export const useFetchFootprint = () => {
  const { airportsCodes, searchInfo } = React.useContext(AppContext);

  const [footprint, setFootprint] = React.useState(null);
  const [totalFootprint, setTotalFootprint] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);

  // GoClimate API - https://api.goclimate.com/docs
  React.useEffect(() => {
    setLoaded(false);

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
        setTotalFootprint(response.data.footprint * searchInfo.passengers);
        setLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [airportsCodes, searchInfo.cabinClass]);

  return { footprint, totalFootprint, loaded };
};
