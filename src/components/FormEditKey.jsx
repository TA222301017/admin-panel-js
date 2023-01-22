import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FormEditKey = ({ keyData, handleSubmit }) => {
  return (
    <Box
      style={{ padding: "20px 0 0 0", width: "50ch" }}
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <Grid
        container
        direction="column"
        alignItems="baseline"
        style={{ display: "flex", flexFlow: "column wrap", gap: "20px" }}
      >
        <TextField
          fullWidth
          size="small"
          required
          id="key_id"
          name="key_id"
          label="Key ID"
          helperText="Berisikan ID Kunci"
          inputProps={{ defaultValue: keyData?.key_id }}
        />
        <TextField
          fullWidth
          size="small"
          required
          id="label"
          name="label"
          label="Label"
          helperText="Berisikan Label Kunci"
          inputProps={{ defaultValue: keyData?.name }}
          autoFocus={true}
        />
        <FormControl sx={{ minWidth: 150 }} size="small" fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            label="Status"
            name="status"
            defaultValue={keyData?.status}
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Not Active</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          size="small"
          id="description"
          name="description"
          multiline
          rows={5}
          label="Keterangan lebih lanjut"
          inputProps={{ defaultValue: keyData?.description }}
        />

        <Button
          type="submit"
          variant="outlined"
          color="inherit"
          size="medium"
          sx={{ mt: 2, width: "57ch" }}
        >
          SIMPAN
        </Button>
      </Grid>
    </Box>
  );
};

export default FormEditKey;
