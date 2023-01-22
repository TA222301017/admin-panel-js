import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Card,
  Grid,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const titikAkses = [
  { value: "Value titikAkses1", label: "titikAkses1" },
  { value: "Value titikAkses2", label: "titikAkses2" },
  { value: "Value titikAkses3", label: "titikAkses3" },
];

const CardPersonel = () => {
  const hapusButton = () => {
    console.log("hapus pushed");
  };

  const simpanButton = () => {
    console.log("simpan pushed");
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Access Point xxx"></CardHeader>
      <CardContent>
        <Grid container direction="row" spacing={2}>
          <Grid
            item
            direction="column"
            xs
            style={{
              display: "flex",
              flexFlow: "column wrap",
              paddingTop: 0,
              marginTop: "20px",
            }}
          >
            <Typography variant="inherit">Titik Akses</Typography>
            <TextField fullWidth id="Peran" name="Peran" select label="Peran">
              {titikAkses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid
            item
            direction="column"
            xs
            style={{
              display: "flex",
              flexFlow: "column wrap",
              paddingTop: 0,
              marginTop: "20px",
            }}
          >
            <Typography variant="inherit">Masa Aktif</Typography>
            <TextField fullWidth id="Peran" name="Peran" select label="Peran">
              {titikAkses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => hapusButton()}
        >
          Hapus
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          onClick={() => simpanButton()}
        >
          Simpan
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardPersonel;
