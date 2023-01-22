import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fontSize } from "@mui/system";
import { MenuItem } from "@mui/material";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Personel",
    path: "/personel",
  },
  {
    name: "Personel",
    path: "/personel/edit",
  },
];

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

const EditPersonel = () => {
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
    <LoggedInLayout
      title="Edit Personel"
      desc="Ubah data personel yang terdaftar dalam sistem"
      breadcrumbs={crumbs}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& .MuiTextField-root": { m: 2, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <div>
            <TextField required id="Nama" name="Nama" label="Nama" />
          </div>
          <div>
            <TextField required id="IDKTP" name="IDKTP" label="No. KTP" />
          </div>

          <div>
            <TextField id="Peran" name="Peran" select label="Peran">
              {peran.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <TextField id="kunci" name="kunci" select label="kunci">
              {kunci.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <TextField id="status" name="status" select label="status">
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <TextField
              id="Keterangan"
              name="Keterangan"
              label="Keterangan lebih lanjut"
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="outlined"
          color="inherit"
          sx={{ m: 2, width: "57ch" }}
        >
          SIMPAN
        </Button>
      </Box>
    </LoggedInLayout>
  );
};

export default EditPersonel;
