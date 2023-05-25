import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

const SelectAutocomplete = ({
  id = "",
  name = "",
  label = "",
  options = [{}],
  fetcher = () => null,
  loading = false,
  defaultValue,
  dataKey = "",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetcher();
  }, []);

  useEffect(() => {
    if (open) {
      fetcher();
    }
  }, [open]);

  return (
    <Autocomplete
      disabled={disabled}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) => (option[dataKey] ? option[dataKey] : "")}
      options={options}
      loading={loading}
      defaultValue={{ [dataKey]: defaultValue }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          id={id}
          name={name}
          label={label}
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          defaultValue={defaultValue}
        />
      )}
    />
  );
};

export default SelectAutocomplete;
