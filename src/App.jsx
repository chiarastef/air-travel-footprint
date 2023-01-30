import React from "react";
import { AppContext } from "./context";

// SEARCH FORM LOGIC
import { useFetchAirportInfo } from "./hooks/search-form/useFetchAirportInfo";
import { useSetDropdown } from "./hooks/search-form/useSetDropdown";
import { useUpdateInputs } from "./hooks/search-form/useUpdateInputs";
import { useSelectAirport } from "./hooks/search-form/useSelectAirport";
import { useSearchFlight } from "./hooks/search-form/useSearchFlight";

// RESULTS LOGIC
import { useFetchFootprint } from "./hooks/results/useFetchFootprint";
import { useModifySearchQueries } from "./hooks/results/useModifySearchQueries";
import { useHideResults } from "./hooks/results/useHideResults";

import Navbar from "./components/navbar/Navbar";
import SearchForm from "./components/search-form/SearchForm";
import Results from "./components/results/Results";

const App = () => {
  const { state } = React.useContext(AppContext);
  const { showResults, isFrom } = state;

  // SEARCH FORM LOGIC
  // Get departure and arrival airports' info
  const { airportInfo, airportInfoLoaded } = useFetchAirportInfo(isFrom);
  // Text inputs dropdowns' position
  const { styleDropdown } = useSetDropdown(isFrom);
  // Set user's queries
  const { updateInputs } = useUpdateInputs();
  // Select airport from dropdown
  const { selectAirport } = useSelectAirport();
  // Submit form and set data to calculate footprint
  const { searchFlight } = useSearchFlight();

  // RESULTS LOGIC
  // Get Footprint data
  const { footprint, totalFootprint, footprintLoaded } = useFetchFootprint();
  // Modify search query for new search
  const { modifySearchQuery } = useModifySearchQueries();
  // Hide results for new search
  const { hideResults } = useHideResults();

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <SearchForm
          airportInfo={airportInfo}
          loaded={airportInfoLoaded}
          styleDropdown={styleDropdown}
          updateInputs={updateInputs}
          selectAirport={selectAirport}
          searchFlight={searchFlight}
        />
        {showResults && (
          <Results
            footprint={footprint}
            totalFootprint={totalFootprint}
            loaded={footprintLoaded}
            modifySearchQuery={modifySearchQuery}
            hideResults={hideResults}
          />
        )}
      </div>
    </div>
  );
};

export default App;
