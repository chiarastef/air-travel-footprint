import React from "react";

import style from "../components/results/results.module.css";

const ResultsGridItem = ({ title, data, isFootprint }) => {
  return (
    <div className={`${style.gridItem} ${isFootprint ? style.footprint : ""}`}>
      <div>{title}</div>
      <div>
        {data}
        {isFootprint ? " kg of CO2" : ""}
      </div>
    </div>
  );
};

export default ResultsGridItem;
