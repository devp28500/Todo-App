import React from "react";
import MuiAutocomplete from "@mui/material/Autocomplete";
import Textfield from "../Textfield";

const Autocomplete = ({
  label,
  options = [],
  disableClearable = true,
  textfieldProps,
  ...props
}) => {
  return (
    <MuiAutocomplete
      disableClearable={disableClearable}
      options={options}
      renderInput={(params) => (
        <Textfield label={label} {...textfieldProps} {...params} />
      )}
      {...props}
    />
  );
};

export default Autocomplete;
