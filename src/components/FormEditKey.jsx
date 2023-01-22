import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

const FormEditKey = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      KeyID: data.get("KeyID"),
      Label: data.get("Label"),
      Status: data.get("Status"),
      Keterangan: data.get("Keterangan"),
    });
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": { m: 2, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid
        container
        direction="column"
        alignItems="baseline"
        justifyContent="center"
      >
        <TextField
          required
          id="KeyID"
          name="KeyID"
          label="Key ID"
          helperText="Berisikan ID Kunci"
        />
        <TextField
          required
          id="Label"
          name="Label"
          label="Label"
          helperText="Berisikan Label Kunci"
        />
        <TextField
          required
          id="Status"
          name="Status"
          label="Status"
          helperText="Berisikan Status Kunci"
        />

        <TextField
          id="Keterangan"
          name="Keterangan"
          label="Keterangan lebih lanjut"
        />

        <Button
          type="submit"
          variant="outlined"
          color="inherit"
          sx={{ m: 2, width: "57ch" }}
        >
          SIMPAN
        </Button>
      </Grid>
    </Box>
  );
};

export default FormEditKey;
