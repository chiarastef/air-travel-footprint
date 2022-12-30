import React from "react";

import { useFetchFootprint } from "../hooks/useFetchFootprint";
import style from "./results.module.css";

const Results = ({ codes, from, to, passengers, cabinClass }) => {
  const { footprint } = useFetchFootprint(codes, cabinClass);

  // Format cabin class
  const cabinClassFormatted =
    cabinClass === "premium_economy" ? "premium economy" : cabinClass;

  // Calculate total footprint based on number of passengers
  const totalFootprint = footprint * passengers;

  if (footprint === null) {
    return (
      <div className={style.results}>Sorry, no results for this search</div>
    );
  } else {
    return (
      <div className={style.results}>
        <div className={style.gridItem}>
          <div>Departure Airport</div>
          <div>{from}</div>
        </div>
        <div className={style.gridItem}>
          <div>Arrival Airport</div>
          <div>{to}</div>
        </div>
        <div className={style.gridItem}>
          <div>Passengers</div>
          <div>{passengers}</div>
        </div>
        <div className={style.gridItem}>
          <div>Cabin Class</div>
          <div>{cabinClassFormatted}</div>
        </div>
        <div className={`${style.gridItem} ${style.footprint}`}>
          <div>Footprint per passenger</div>
          <div>{`${footprint} kg of CO2`}</div>
        </div>
        <div className={`${style.gridItem} ${style.footprint}`}>
          <div>Total Footprint</div>
          <div>{`${totalFootprint} kg of CO2`}</div>
        </div>
      </div>
    );
  }
};

export default Results;
