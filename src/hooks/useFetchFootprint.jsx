import React from "react";
import axios from "axios";

export const useFetchFootprint = (codes) => {
  const [footprint, setFootprint] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(
        `https://api.goclimate.com/v1/flight_footprint?segments[0][origin]=${codes.origin}&segments[0][destination]=${codes.destination}&cabin_class=economy&&currencies[]=EUR`,
        {
          auth: {
            username: import.meta.env.VITE_GOCLIMATE_API_KEY,
          },
        }
      )
      .then(function (response) {
        // handle success
        console.log(response.data);
        const resp = response.data.footprint;
        setFootprint(resp);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return { footprint };
};
