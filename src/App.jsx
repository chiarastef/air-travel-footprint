import React from "react";

import { AppContext } from "./context";

import Navbar from "./navbar/Navbar";
import SearchForm from "./search-form/SearchForm";
import Results from "./results/Results";

const App = () => {
  const { showResults } = React.useContext(AppContext);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <SearchForm />
        {showResults && <Results />}
      </div>
    </div>
  );
};

export default App;
