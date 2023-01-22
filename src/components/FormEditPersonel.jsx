import React from "react";  
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MenuItem } from "@mui/material";
import { Grid } from "@mui/material";

const peran = [
  { value: "Value Peran1", label: "Peran1" },
  { value: "Value Peran2", label: "Peran2" },
  { value: "Value Peran3", label: "Peran3" },
];

const kunci = [
  { value: "Value Kunci1", label: "Kunci1" },
  { value: "Value Kunci2", label: "Kunci2" },
  { value: "Value Kunci3", label: "Kunci3" },
];

const status = [
  { value: "Value Status1", label: "Status1" },
  { value: "Value Status2", label: "Status2" },
  { value: "Value Status3", label: "Status3" },
];

const FormEditPersonel = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      Nama: data.get("Nama"),
      IDKTP: data.get("IDKTP"),
      Peran: data.get("Peran"),
      kunci: data.get("kunci"),
      status: data.get("status"),
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
        <TextField required id="Nama" name="Nama" label="Nama" />

        <TextField required id="IDKTP" name="IDKTP" label="No. KTP" />

        <TextField id="Peran" name="Peran" select label="Peran">
          {peran.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField id="kunci" name="kunci" select label="kunci">
          {kunci.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField id="status" name="status" select label="status">
          {status.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

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

export default FormEditPersonel;
