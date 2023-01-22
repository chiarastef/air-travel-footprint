import React from "react";
import { AppContext } from "./context";

// SEARCH FORM LOGIC
import { useFetchAirportInfo } from "./search-form/hooks/useFetchAirportInfo";
import { useSetDropdown } from "./search-form/hooks/useSetDropdown";
import { useUpdateInputs } from "./search-form/hooks/useUpdateInputs";
import { useSelectAirport } from "./search-form/hooks/useSelectAirport";
import { useSearchFlight } from "./search-form/hooks/useSearchFlight";

// RESULTS LOGIC
import { useFetchFootprint } from "./results/hooks/useFetchFootprint";
import { useModifySearchQueries } from "./results/hooks/useModifySearchQueries";
import { useHideResults } from "./results/hooks/useHideResults";

import Navbar from "./navbar/Navbar";
import SearchForm from "./search-form/SearchForm";
import Results from "./results/Results";

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
