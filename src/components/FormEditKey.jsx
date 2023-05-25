import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Paper } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const FormEditKey = ({ keyData, handleSubmit }) => {
  return (
    <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid container alignItems="baseline" spacing={3}>
          <Grid
            item
            xs={6}
            style={{ display: "flex", flexFlow: "column wrap", gap: "20px" }}
          >
            <TextField
              fullWidth
              size="small"
              required
              id="label"
              name="label"
              label="Label"
              helperText="Berisikan Label Kunci"
              placeholder="Kunci XXX"
              inputProps={{ defaultValue: keyData?.name }}
              InputLabelProps={{
                shrink: true,
              }}
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
              required
              id="key_id"
              name="key_id"
              label="Key ID"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="DEADBEEFDEADBEEFDEADBEEFDEADBEEF"
              inputProps={{ defaultValue: keyData?.key_id }}
            />
            <TextField
              fullWidth
              size="small"
              required
              id="aes_key"
              name="aes_key"
              label="AES Key"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="DEADBEEFDEADBEEFDEADBEEFDEADBEEF"
              inputProps={{ defaultValue: keyData?.aes_key }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", flexFlow: "column wrap", gap: "20px" }}
          >
            <TextField
              fullWidth
              size="small"
              id="description"
              name="description"
              multiline
              rows={8}
              label="Keterangan lebih lanjut"
              inputProps={{ defaultValue: keyData?.description }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              sx={{ mt: 1 }}
            >
              SIMPAN
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default FormEditKey;
