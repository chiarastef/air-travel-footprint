import React from "react";

// Material UI - https://v4.mui.com/
import Button from "@mui/material/Button";

import style from "../results.module.css";

const ResultsButton = ({ text, func }) => {
  return (
    <Button
      type="button"
      variant="contained"
      sx={{ mt: 3, width: "100%" }}
      className={style.changeSearchBtn}
      onClick={func}
    >
      {text}
    </Button>
  );
};

export default ResultsButton;
