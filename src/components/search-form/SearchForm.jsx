import React from "react";
import { AppContext } from "../../context";

import TextInput from "../../atoms/inputs/TextInput";
import Dropdown from "../../atoms/Dropdown";
import NumberInput from "../../atoms/inputs/NumberInput";
import SelectInput from "../../atoms/inputs/SelectInput";
import SubmitButton from "../../atoms/buttons/SubmitButton";

import style from "./search-form.module.css";

const SearchForm = ({
  airportInfo,
  loaded,
  styleDropdown,
  updateInputs,
  selectAirport,
  searchFlight,
}) => {
  const { state } = React.useContext(AppContext);
  const { searchQueries, showDropdown } = state;

  return (
    <>
      <form className={style.searchFormContainer} onSubmit={searchFlight}>
        <div className={style.formRow}>
          {/* From */}
          <TextInput isFromInput={true} handleChange={updateInputs} />
          {showDropdown.from && searchQueries.from.length > 0 && (
            <Dropdown
              styleDropdown={styleDropdown}
              isFromInput={true}
              airportInfo={airportInfo}
              loaded={loaded}
              selectAirport={selectAirport}
            />
          )}
          {/* To */}
          <TextInput isFromInput={false} handleChange={updateInputs} />
          {showDropdown.to && searchQueries.to.length > 0 && (
            <Dropdown
              styleDropdown={styleDropdown}
              isFromInput={false}
              airportInfo={airportInfo}
              loaded={loaded}
              selectAirport={selectAirport}
            />
          )}
        </div>
        <div className={style.formRow}>
          {/* Passengers */}
          <NumberInput handleChange={updateInputs} />
          {/* Cabin class */}
          <SelectInput handleChange={updateInputs} />
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export default SearchForm;
