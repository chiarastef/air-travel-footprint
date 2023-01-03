import React from "react";
import classnames from "classnames";
import BeatLoader from "react-spinners/BeatLoader";

import { useFetchFootprint } from "../hooks/useFetchFootprint";
import style from "./results.module.css";

const Results = ({ codes, searchData }) => {
  const { footprint, loaded } = useFetchFootprint(codes, searchData.cabinClass);

  const spinnerStyle = {
    display: "block",
    textAlign: "center",
    margin: "60px auto",
  };

  // Format cabin class
  const cabinClassFormatted =
    searchData.cabinClass === "premium_economy"
      ? "premium economy"
      : searchData.cabinClass;

  // Calculate total footprint based on number of passengers
  const totalFootprint = footprint * searchData.passengers;

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

  if (loaded && footprint === null) {
    return <div className={style.error}>Sorry, no results for this search</div>;
  }

  return (
    <div className={style.results}>
      <div className={style.gridItem}>
        <div>Departure Airport</div>
        <div>{searchData.from}</div>
      </div>
      <div className={style.gridItem}>
        <div>Arrival Airport</div>
        <div>{searchData.to}</div>
      </div>
      <div className={style.gridItem}>
        <div>Passengers</div>
        <div>{searchData.passengers}</div>
      </div>
      <div className={style.gridItem}>
        <div>Cabin Class</div>
        <div>{cabinClassFormatted}</div>
      </div>
      <div className={classnames(style.gridItem, style.footprint)}>
        <div>Footprint per passenger</div>
        <div>{`${footprint} kg of CO2`}</div>
      </div>
      <div className={classnames(style.gridItem, style.footprint)}>
        <div>Total Footprint</div>
        <div>{`${totalFootprint} kg of CO2`}</div>
      </div>
    </div>
  );
};

export default Results;
