import React from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const fromInput = React.useRef(null);
  const toInput = React.useRef(null);

  // Controlled inputs values
  const [searchQueries, setSearchQueries] = React.useState({
    from: "",
    to: "",
    passengers: "",
    cabinClass: "",
  });
  // Submitted search info
  const [searchInfo, setSearchInfo] = React.useState({
    from: "",
    to: "",
    passengers: "",
    cabinClass: "",
  });

  const [airportsCodes, setAirportsCodes] = React.useState({
    origini: "",
    destination: "",
  });
  const [showDropdown, setShowDropdown] = React.useState({
    from: false,
    to: false,
  });
  const [showResults, setShowResults] = React.useState(false);

  return (
    <AppContext.Provider
      value={{
        fromInput,
        toInput,
        searchQueries,
        setSearchQueries,
        searchInfo,
        setSearchInfo,
        airportsCodes,
        setAirportsCodes,
        showResults,
        setShowResults,
        showDropdown,
        setShowDropdown,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
