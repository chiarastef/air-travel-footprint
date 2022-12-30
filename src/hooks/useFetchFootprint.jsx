import React from "react";
import axios from "axios";

export const useFetchFootprint = (codes, cabinClass) => {
  const [footprint, setFootprint] = React.useState(null);

  // GoClimate API - https://api.goclimate.com/docs
  React.useEffect(() => {
    axios
      .get(
        `https://api.goclimate.com/v1/flight_footprint?segments[0][origin]=${codes.origin}&segments[0][destination]=${codes.destination}&cabin_class=${cabinClass}&&currencies[]=EUR`,
        {
          auth: {
            username: import.meta.env.VITE_GOCLIMATE_API_KEY,
          },
        }
      )
      .then(function (response) {
        const resp = response.data.footprint;
        setFootprint(resp);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [codes, cabinClass]);

  return { footprint };
};
