import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper, Tooltip } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import { CopyAllSharp } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { toastInfo } from "../store/reducers/toastSlice";
import { useEffect } from "react";

const FormEditLock = ({ lockData, handleSubmit }) => {
  const dispatch = useDispatch();

  return (
    <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={5}>
          <Grid
            item
            xs={6}
            direction="column"
            style={{
              display: "flex",
              flexFlow: "column wrap",
              gap: "20px",
            }}
          >
            <TextField
              fullWidth
              size="small"
              required
              id="label"
              name="label"
              label="Label"
              helperText="Berisikan Label/Nama Lock"
              inputProps={{ defaultValue: lockData.name }}
            />

            <TextField
              fullWidth
              size="small"
              required
              id="location"
              name="location"
              label="Location"
              helperText="Berisikan Lokasi Lock"
              inputProps={{ defaultValue: lockData.location }}
            />

            <TextField
              fullWidth
              size="small"
              required
              id="ip_address"
              name="ip_address"
              label="IP Address"
              helperText="Berisikan IP Address Lock yang Terpasang"
              inputProps={{ defaultValue: lockData.ip_address, readOnly: true }}
            />

            <TextField
              fullWidth
              size="small"
              required
              id="LockID"
              name="LockID"
              label="Lock ID"
              helperText="Berisikan ID Lock"
              inputProps={{ defaultValue: lockData.lock_id, readOnly: true }}
            />
            <TextField
              fullWidth
              size="small"
              required
              id="public_key"
              name="public_key"
              label="Public Key"
              helperText="Berisikan Public Key Kunci"
              inputProps={{
                defaultValue: lockData.public_key,
                readOnly: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" ti>
                    <Tooltip title="Copy Public Key to Clipboard">
                      <IconButton
                        onClick={() => {
                          navigator.clipboard.writeText(lockData.public_key);
                          dispatch(toastInfo("Copied to Clipboard!"));
                        }}
                        edge="end"
                      >
                        <CopyAllSharp />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            direction="column"
            style={{
              display: "flex",
              flexFlow: "column wrap",
              gap: "20px",
            }}
          >
            <FormControl sx={{ minWidth: 150 }} size="small" fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                label="Status"
                name="status"
                defaultValue={lockData.status}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Not Active</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              multiline
              rows={10}
              size="small"
              id="description"
              name="description"
              label="Keterangan lebih lanjut"
              inputProps={{ defaultValue: lockData.description }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              SIMPAN
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default FormEditLock;
