import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Grid,
  MenuItem,
  TextField,
  Box,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GET_KEYS } from "../store/reducers/keySlice";
import { GET_ROLES } from "../store/reducers/roleSlice";
import TabPanel from "./TabPanel";
import AccessRuleTable from "./AccessRuleTable";
import SelectAutocomplete from "./SelectAutocomplete";

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

const FormEditPersonel = ({ personelData, handleSubmit }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    setTabIndex(tabIndex);
  };

  const {
    value: { keys },
    status: keyStatus,
  } = useSelector((state) => state.key);

  const {
    value: { roles },
    status: roleStatus,
  } = useSelector((state) => state.role);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      GET_KEYS({
        page: 1,
        limit: -1,
        keyword: "",
        status: "any",
      })
    );

    dispatch(GET_ROLES());
  }, []);

  return (
    <Paper
      elevation={3}
      style={{ padding: "0 20px 20px 20px", marginTop: "40px" }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="basic tabs example"
        style={{ padding: "10px 0" }}
      >
        <Tab label="Data Pribadi" {...a11yProps(0)} />
        <Tab
          label="Peraturan Akses"
          {...a11yProps(1)}
          disabled={!personelData}
        />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Grid container direction="row" spacing={5}>
            <Grid
              item
              xs={6}
              direction="column"
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              <TextField
                size="small"
                required
                id="name"
                name="name"
                label="Nama"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Budi Budiman"
                inputProps={{ defaultValue: personelData?.name }}
              />

              <TextField
                size="small"
                required
                id="personel_id"
                name="personel_id"
                label="No. KTP"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="307020109089001"
                inputProps={{ defaultValue: personelData?.personel_id }}
              />

              {roleStatus === "fulfilled" && (
                <TextField
                  size="small"
                  id="role_id"
                  name="role_id"
                  select
                  label="Peran"
                  inputProps={{ defaultValue: personelData?.role_id }}
                >
                  {roles.map((el) => (
                    <MenuItem key={el.id} value={el.id}>
                      {el.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {
                // keyStatus === "fulfilled" && (
                <SelectAutocomplete
                  name="key"
                  label="Key"
                  options={
                    personelData
                      ? keys.filter(
                          (el) =>
                            el.owner_id == 0 || el.owner_id == personelData.id
                        )
                      : keys.filter((el) => el.owner_id == 0)
                  }
                  loading={keyStatus === "pending"}
                  defaultValue={personelData?.key}
                  dataKey="name"
                  fetcher={() =>
                    dispatch(
                      GET_KEYS({
                        page: 1,
                        limit: -1,
                        keyword: "",
                        status: "any",
                      })
                    )
                  }
                />
              }

              <TextField
                size="small"
                id="status"
                name="status"
                select
                label="Status"
                inputProps={{ defaultValue: personelData?.status }}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Not Active</MenuItem>
              </TextField>
            </Grid>
            <Grid
              item
              xs={6}
              direction="column"
              style={{
                display: "flex",
                flexFlow: "column wrap",
                gap: "20px",
                paddingTop: 0,
                marginTop: "60px",
              }}
            >
              <TextField
                multiline
                rows={9}
                size="small"
                id="description"
                name="description"
                label="Keterangan lebih lanjut"
                inputProps={{ defaultValue: personelData?.description }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                SIMPAN
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <AccessRuleTable personelId={personelData?.id} />
      </TabPanel>
    </Paper>
  );
};

export default FormEditPersonel;
