import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, Grid, CardContent, CardHeader } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_LOCKS } from "../store/reducers/lockSlice";
import { toastError, toastSuccess } from "../store/reducers/toastSlice";
import {
  ADD_ACCESS_RULE,
  EDIT_ACCESS_RULE,
} from "../store/reducers/accessRuleSlice";
import { timeToAPIDateString } from "../utils/formatTime";
import { GET_PERSONELS } from "../store/reducers/personelSlice";

const CardPersonel = ({
  accessRuleIndex = -1,
  setModalOpen = () => null,
  withPersonelSelection = false,
}) => {
  const {
    value: { locks },
  } = useSelector((state) => state.lock);

  const {
    value: { personel, personels },
  } = useSelector((state) => state.personel);

  const {
    value: { accessRules },
  } = useSelector((state) => state.accessRule);

  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(
    new Date().toLocaleDateString() + " 00:00"
  );
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString() + " 23:59"
  );
  const [lockId, setLockId] = useState(
    accessRuleIndex >= 0 ? accessRules[accessRuleIndex].lock_id : 1
  );
  const [personelId, setPersonelId] = useState(
    accessRuleIndex >= 0 ? accessRules[accessRuleIndex].personel_id : 0
  );

  const simpanButton = () => {
    if (accessRuleIndex === -1) {
      dispatch(
        ADD_ACCESS_RULE({
          lockId: lockId,
          personelId: withPersonelSelection ? personelId : personel.id,
          startsAt: timeToAPIDateString(new Date(startDate)),
          endsAt: timeToAPIDateString(new Date(endDate)),
        })
      ).then((res) => {
        if (res.payload.error) {
          dispatch(toastError(res.payload.error));
        } else {
          dispatch(toastSuccess("Perubahan berhasil disimpan"));
          setLockId(0);
          setStartDate(new Date().toLocaleDateString() + " 00:00");
          setEndDate(new Date().toLocaleDateString() + " 23:59");
        }
      });
    } else {
      dispatch(
        EDIT_ACCESS_RULE({
          accessRuleId: accessRules[accessRuleIndex].id,
          startsAt: timeToAPIDateString(new Date(startDate)),
          endsAt: timeToAPIDateString(new Date(endDate)),
          lockId: lockId,
        })
      ).then((res) => {
        if (res.payload.error) {
          dispatch(toastError(res.payload.error));
        } else {
          dispatch(toastSuccess("Perubahan berhasil disimpan"));
          setModalOpen(false);
        }
      });
    }
  };

  useEffect(() => {
    dispatch(
      GET_LOCKS({
        page: 1,
        limit: 1000,
        keyword: "",
        status: true,
      })
    );

    if (withPersonelSelection) {
      dispatch(
        GET_PERSONELS({
          page: 1,
          limit: 1000,
          keyword: "",
          status: true,
        })
      );
    }
  }, []);

  return (
    <Card variant="outlined" style={{ marginTop: 0 }}>
      <CardHeader
        title={accessRuleIndex >= 0 ? "Edit Access Rule" : "Add Access Rule"}
      />
      <CardContent>
        <Grid container spacing={2} direction="column" component="form">
          <Grid item>
            <Grid item direction="column" xs>
              {withPersonelSelection && personels.length && (
                <TextField
                  fullWidth
                  id="personel_id"
                  name="personel_id"
                  select
                  label="Personel"
                  size="small"
                  value={personelId}
                  onChange={(e) => setPersonelId(e.target.value)}
                  inputProps={
                    accessRule ? { defaultValue: accessRule.personel_id } : null
                  }
                  disabled={accessRuleIndex >= 0}
                >
                  {personels.map((el, index) => (
                    <MenuItem key={index} value={el.id}>
                      {el.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Grid item direction="column" xs>
              {locks.length && (
                <TextField
                  fullWidth
                  id="lock_id"
                  name="lock_id"
                  select
                  label="Lokasi"
                  size="small"
                  value={lockId}
                  onChange={(e) => setLockId(e.target.value)}
                  inputProps={
                    accessRuleIndex >= 0
                      ? { defaultValue: accessRules[accessRuleIndex].lock_id }
                      : null
                  }
                >
                  {locks.map((el, index) => (
                    <MenuItem key={index} value={el.id}>
                      {el.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
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
          <Grid item>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={() => simpanButton()}
            >
              Simpan
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardPersonel;
