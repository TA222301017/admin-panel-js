import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

const FormEditLock = () => {
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
          id="Location"
          name="Location"
          label="Location Keys"
          helperText="Berisikan Lokasi Kunci"
        />

        <TextField
          required
          id="IPAddress"
          name="IPAddress"
          label="IP Address"
          helperText="Berisikan IP Address Kunci Terpasang"
        />

        <TextField
          required
          id="LockID"
          name="LockID"
          label="Lock ID"
          helperText="Berisikan ID Kunci"
        />

        <TextField
          required
          id="PublicKey"
          name="PublicKey"
          label="Public Key"
          helperText="Berisikan Public Key Kunci"
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

export default FormEditLock;
