import React, { useState } from "react";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

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

  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString() + " 00:00"
  );
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString() + " 23:59"
  );

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
            <Typography variant="inherit">Waktu Mulai</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={startDate}
                onChange={setStartDate}
                ampm={false}
                renderInput={(params) => (
                  <TextField {...params} size="large" name="startdate" />
                )}
              />
              <br></br>
              <Typography variant="inherit">Waktu Berakhir</Typography>
              <DateTimePicker
                value={endDate}
                onChange={setEndDate}
                ampm={false}
                renderInput={(params) => (
                  <TextField {...params} size="large" name="enddate" />
                )}
              />
            </LocalizationProvider>
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
