import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { AppContext } from "../../context";

import ResultsGridItem from "../../atoms/ResultsGridItem";
import ResultsButton from "../../atoms/buttons/ResultsButton";

import style from "./results.module.css";

const Results = ({
  footprint,
  totalFootprint,
  loaded,
  modifySearchQuery,
  hideResults,
}) => {
  const { state } = React.useContext(AppContext);
  const { searchInfo } = state;

  // Style for react spinner
  const spinnerStyle = {
    display: "block",
    textAlign: "center",
    margin: "60px auto",
  };

  // Format cabin class
  const cabinClassFormatted =
    searchInfo.cabinClass === "premium_economy"
      ? "premium economy"
      : searchInfo.cabinClass;

  if (!loaded) {
    return (
      <BeatLoader
        color={"#1565c0"}
        loading={true}
        cssOverride={spinnerStyle}
        size={18}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  if (footprint === null) {
    return <div className={style.error}>Sorry, no results for this search</div>;
  }

  return (
    <div className={style.results}>
      <ResultsGridItem
        title={"Departure Airport"}
        data={searchInfo.from}
        isFootprint={false}
      />
      <ResultsGridItem
        title={"Arrival Airport"}
        data={searchInfo.to}
        isFootprint={false}
      />
      <ResultsGridItem
        title={"Passengers"}
        data={searchInfo.passengers}
        isFootprint={false}
      />
      <ResultsGridItem
        title={"Cabin Class"}
        data={cabinClassFormatted}
        isFootprint={false}
      />
      <ResultsGridItem
        title={"Footprint per passenger"}
        data={footprint}
        isFootprint={true}
      />
      <ResultsGridItem
        title={"Total footprint"}
        data={totalFootprint}
        isFootprint={true}
      />
      <div className={style.gridItem}>
        <ResultsButton text="change search" func={modifySearchQuery} />
        <ResultsButton text="new search" func={hideResults} />
      </div>
    </div>
  );
};

export default Results;
