import React from "react";
import { AppContext } from "../../context";

export const useSearchFlight = () => {
  const {
    setAirportsCodes,
    searchQueries,
    setSearchInfo,
    setShowResults,
    setSearchQueries,
  } = React.useContext(AppContext);

  // Set data to search footprint and show results
  const handleSubmit = (e) => {
    e.preventDefault();
    // Set airport codes
    setAirportsCodes({
      origin: searchQueries.from.slice(0, 3),
      destination: searchQueries.to.slice(0, 3),
    });

    // Add submitted search queries to searchInfo
    setSearchInfo(searchQueries);

    // Show results data
    setShowResults(true);

    // Reset form
    setSearchQueries({ from: "", to: "", passengers: "", cabinClass: "" });
  };

  return { handleSubmit };
};
