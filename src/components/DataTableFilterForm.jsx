import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { SearchSharp } from "@mui/icons-material";
import { Paper } from "@mui/material";

const DataTableFilterForm = ({
  handleSearch,
  keywordLabel = "Keyword",
  keywordDefault = "",
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
    <Paper elevation={3} style={{ maxWidth: "max-content" }}>
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          padding: "10px",
          margin: "20px 0",
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
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={`${keywordLabel}...`}
          inputProps={{
            defaultValue: keywordDefault,
          }}
        />

        {!withoutStatus && (
          <FormControl sx={{ minWidth: 150 }} size="small">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              label="Status"
              name="status"
              defaultValue={"any"}
            >
              <MenuItem value={"active"}>Active</MenuItem>
              <MenuItem value={"notactive"}>Not Active</MenuItem>
              <MenuItem value={"any"}>Any</MenuItem>
            </Select>
          </FormControl>
        )}

        <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          startIcon={<SearchSharp />}
        >
          Cari
        </Button>

        {children}
      </form>
    </Paper>
  );
};

export default DataTableFilterForm;
