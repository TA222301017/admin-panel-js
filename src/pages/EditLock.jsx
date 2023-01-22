import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fontSize } from "@mui/system";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Lock",
    path: "/lock",
  },
  {
    name: "Edit",
    path: "/lock/edit",
  },
];

const EditLock = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      Location: data.get("Location"),
      IPAddress: data.get("IPAddress"),
      LockID: data.get("LockID"),
      PublicKey: data.get("PublicKey"),
      Keterangan: data.get("Keterangan"),
    });
  };

  return (
    <LoggedInLayout
      title="Edit Lock"
      desc="Ubah data lock yang ada dalam sistem"
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
            <TextField
              required
              id="Location"
              name="Location"
              label="Location Keys"
              helperText="Berisikan Lokasi Kunci"
            />
          </div>
          <div>
            <TextField
              required
              id="IPAddress"
              name="IPAddress"
              label="IP Address"
              helperText="Berisikan IP Address Kunci Terpasang"
            />
          </div>
          <div>
            <TextField
              required
              id="LockID"
              name="LockID"
              label="Lock ID"
              helperText="Berisikan ID Kunci"
            />
          </div>
          <div>
            <TextField
              required
              id="PublicKey"
              name="PublicKey"
              label="PublicKey"
              helperText="Berisikan Public Key Kunci"
            />
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

export default EditLock;
