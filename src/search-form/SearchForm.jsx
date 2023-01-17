import React from "react";
import { AppContext } from "../context";

import { useChangeTextInputs } from "./hooks/useChangeTextInputs";
import { useSetDropdown } from "./hooks/useSetDropdown";
import { useSelectAirport } from "./hooks/useSelectAirport";
import { useSearchFlight } from "./hooks/useSearchFlight";

import TextInput from "./atoms/TextInput";
import Dropdown from "./atoms/Dropdown";
import NumberInput from "./atoms/NumberInput";
import SelectInput from "./atoms/SelectInput";
import SubmitButton from "./atoms/SubmitButton";

import style from "./search-form.module.css";

const SearchForm = () => {
  const { showDropdown } = React.useContext(AppContext);

  // isFrom shows which input is changing (important to set responsive style to dropdown)
  // handleChange updates search queries when user types
  const { isFrom, handleChange } = useChangeTextInputs();

  // Text inputs dropdowns' styles
  const { styleDropdown } = useSetDropdown(isFrom);

  // Select airport from dropdown
  const { selectAirport } = useSelectAirport();

  // Submit form and set data to calculate footprint
  const { handleSubmit } = useSearchFlight();

  return (
    <>
      <form className={style.searchFormContainer} onSubmit={handleSubmit}>
        <div className={style.formRow}>
          {/* From */}
          <TextInput isFromInput={true} handleChange={handleChange} />
          {showDropdown.from && (
            <Dropdown
              styleDropdown={styleDropdown}
              isFromInput={true}
              selectAirport={selectAirport}
            />
          )}
          {/* To */}
          <TextInput isFromInput={false} handleChange={handleChange} />
          {showDropdown.to && (
            <Dropdown
              styleDropdown={styleDropdown}
              isFromInput={false}
              selectAirport={selectAirport}
            />
          )}
        </div>
        <div className={style.formRow}>
          {/* Passengers */}
          <NumberInput />
          {/* Cabin class */}
          <SelectInput />
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export default SearchForm;
