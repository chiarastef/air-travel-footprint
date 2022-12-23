import React from "react";

import Navbar from "./navbar/Navbar";
import SearchForm from "./search-form/SearchForm";

import { useFetchAirportCode } from "./hooks/useFetchAirportCode";
import { useFetchFootprint } from "./hooks/useFetchFootprint";

const App = () => {
  // const { code } = useFetchAirportCode("Rome");
  // const { footprint } = useFetchFootprint({
  //   origin: "COR",
  //   destination: "COS",
  // });

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

// {
//   code.length > 1 ? (
//     code.map((code, i) => {
//       return <div key={i}>{code.code}</div>;
//     })
//   ) : (
//     <div>{code.code}</div>
//   );
// }
