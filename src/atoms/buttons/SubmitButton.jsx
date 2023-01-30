import React from "react";

// Material UI - https://v4.mui.com/
import Button from "@mui/material/Button";

const SubmitButton = () => {
  return (
    <Button type="submit" variant="contained" sx={{ mt: 3, width: "100%" }}>
      calculate
    </Button>
  );
};

export default SubmitButton;
