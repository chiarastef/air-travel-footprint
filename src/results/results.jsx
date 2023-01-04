import React from "react";
import classnames from "classnames";
import BeatLoader from "react-spinners/BeatLoader";
import Button from "@mui/material/Button";

import { useFetchFootprint } from "../hooks/useFetchFootprint";

import style from "./results.module.css";

const Results = ({
  codes,
  searchQueries,
  changeSearchQueries,
  setNewSearch,
}) => {
  const { footprint, loaded } = useFetchFootprint(
    codes,
    searchQueries.cabinClass
  );

  const spinnerStyle = {
    display: "block",
    textAlign: "center",
    margin: "60px auto",
  };

  // Format cabin class
  const cabinClassFormatted =
    searchQueries.cabinClass === "premium_economy"
      ? "premium economy"
      : searchQueries.cabinClass;

  // Calculate total footprint based on number of passengers
  const totalFootprint = footprint * searchQueries.passengers;

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
      <div className={style.gridItem}>
        <div>Departure Airport</div>
        <div>{searchQueries.from}</div>
      </div>
      <div className={style.gridItem}>
        <div>Arrival Airport</div>
        <div>{searchQueries.to}</div>
      </div>
      <div className={style.gridItem}>
        <div>Passengers</div>
        <div>{searchQueries.passengers}</div>
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
      <div className={style.gridItem}>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, width: "100%" }}
          className={style.changeSearchBtn}
          onClick={changeSearchQueries}
        >
          change search
        </Button>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, width: "100%" }}
          className={style.newSearchBtn}
          onClick={setNewSearch}
        >
          new search
        </Button>
      </div>
    </div>
  );
};

export default Results;
