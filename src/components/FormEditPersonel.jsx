import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, MenuItem } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch, useSelector } from "react-redux";
import { GET_KEYS } from "../store/reducers/keySlice";
import { GET_ROLES } from "../store/reducers/roleSlice";
import TabPanel from "./TabPanel";
import AccessRuleTable from "./AccessRuleTable";

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
        limit: 1000,
      })
    );

    dispatch(GET_ROLES());
  }, []);

  return (
    <>
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
                paddingTop: 0,
                marginTop: "60px",
              }}
            >
              <TextField
                size="small"
                required
                id="name"
                name="name"
                label="Nama"
                inputProps={{ defaultValue: personelData?.name }}
              />

              <TextField
                size="small"
                required
                id="personel_id"
                name="personel_id"
                label="No. KTP"
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

              {keyStatus === "fulfilled" && (
                <TextField
                  size="small"
                  id="key_id"
                  name="key_id"
                  select
                  label="Kunci"
                  inputProps={{ defaultValue: personelData?.key_id }}
                >
                  {keys.map((el) => (
                    <MenuItem key={el.id} value={el.id}>
                      {el.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}

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
                variant="outlined"
                color="inherit"
                fullWidth
              >
                SIMPAN
              </Button>
              {/* <CardPersonel /> */}
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <AccessRuleTable personelId={personelData?.id} />
      </TabPanel>
    </>
  );
};

export default FormEditPersonel;
