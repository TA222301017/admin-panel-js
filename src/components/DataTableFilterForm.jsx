import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const DataTableFilterForm = ({
  handleSearch,
  keywordLabel = "Keyword",
  withDate = false,
  withoutStatus = false,
  children,
}) => {
  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString() + " 00:00"
  );
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString() + " 23:59"
  );

  return (
    <form
      onSubmit={handleSearch}
      style={{
        display: "flex",
        padding: "20px 0",
        gap: "20px",
      }}
    >
      {withDate && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            ampm={false}
            renderInput={(params) => (
              <TextField {...params} size="small" name="startdate" />
            )}
          />
          <DateTimePicker
            label="End Date"
            value={endDate}
            onChange={setEndDate}
            ampm={false}
            renderInput={(params) => (
              <TextField {...params} size="small" name="enddate" />
            )}
          />
        </LocalizationProvider>
      )}

      <TextField
        label={keywordLabel}
        variant="outlined"
        size="small"
        name="keyword"
      />

      {!withoutStatus && (
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            label="Status"
            name="status"
            defaultValue={true}
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Not Active</MenuItem>
          </Select>
        </FormControl>
      )}

      <Button type="submit" size="medium" variant="outlined">
        Cari
      </Button>

      {children}
    </form>
  );
};

export default DataTableFilterForm;
