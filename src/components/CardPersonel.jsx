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
    <Card variant="outlined" style={{ marginTop: 0 }}>
      <CardHeader title="Access Rule" />
      <CardContent>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Grid item direction="column" xs>
              <TextField
                fullWidth
                id="lock_id"
                name="lock_id"
                select
                label="Lokasi"
                size="small"
              >
                {titikAkses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={2} direction="row">
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={startDate}
                    onChange={setStartDate}
                    ampm={false}
                    renderInput={(params) => (
                      <TextField {...params} size="small" name="startdate" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={endDate}
                    onChange={setEndDate}
                    ampm={false}
                    renderInput={(params) => (
                      <TextField {...params} size="small" name="enddate" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
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
