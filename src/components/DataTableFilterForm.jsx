import React from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DataTableFilterForm = ({ handleSearch }) => {
  const navigate = useNavigate();
  return (
    <form
      onSubmit={handleSearch}
      style={{
        display: "flex",
        padding: "20px 0",
        gap: "20px",
      }}
    >
      <TextField
        label="Keyword"
        variant="outlined"
        size="small"
        name="keyword"
      />

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

      <Button type="submit" size="medium" variant="outlined">
        Cari
      </Button>

      <Button type="button" size="medium" variant="outlined">
        Export
      </Button>
      <Button
        type="button"
        size="medium"
        variant="outlined"
        onClick={() => navigate("/lock/add")}
      >
        Tambah
      </Button>
    </form>
  );
};

export default DataTableFilterForm;
