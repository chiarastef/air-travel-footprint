import React from "react";

import style from "./search-form.module.css";

const SearchForm = () => {
  return (
    <form className={style.searchFormContainer}>
      <div className={style.formRow}>
        <div className={style.formElement}>
          <label htmlFor="from">From: </label>
          <input type="text" id="from" />
        </div>
        <div className={style.formElement}>
          <label htmlFor="to">To: </label>
          <input type="text" id="to" />
        </div>
      </div>
      <div className={style.formRow}>
        <div className={style.formElement}>
          <label htmlFor="passengers">Number of passengers:</label>
          <input type="number" id="passengers" />
        </div>
        <div className={style.formElement}>
          <label htmlFor="class">Cabin class: </label>
          <select name="class" id="class" defaultValue="select-placeholder">
            <option value="select-placeholder" disabled>
              --select--
            </option>
            <option value="economy">economy</option>
            <option value="premium_economy">premium economy</option>
            <option value="business">business</option>
            <option value="first">first</option>
          </select>
        </div>
      </div>
      <button type="submit" className={style.btn}>
        calculate
      </button>
    </form>
  );
};

export default SearchForm;
