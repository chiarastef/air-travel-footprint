import React from "react";

import Navbar from "./navbar/Navbar";
import SearchForm from "./search-form/SearchForm";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <SearchForm />
      </div>
    </div>
  );
};

export default App;
