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
import {
  timeToAPIDateString,
  timeToDatePickerString,
} from "../utils/formatTime";
import { GET_PERSONELS } from "../store/reducers/personelSlice";
import SelectAutocomplete from "./SelectAutocomplete";

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
    accessRuleIndex >= 0
      ? timeToDatePickerString(new Date(accessRules[accessRuleIndex].starts_at))
      : new Date().toLocaleDateString() + " 00:00"
  );
  const [endDate, setEndDate] = useState(
    accessRuleIndex >= 0
      ? timeToDatePickerString(new Date(accessRules[accessRuleIndex].ends_at))
      : new Date().toLocaleDateString() + " 23:59"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    let lockId = locks.filter((el) => el.name === data.get("lock"));
    let personelId = personels.filter((el) => el.name === data.get("personel"));

    if (accessRuleIndex < 0) {
      if (lockId.length === 0) {
        dispatch(toastError("Pilihan lock tidak valid"));
        return;
      }
      lockId = lockId[0].id;

      if (withPersonelSelection) {
        if (personelId.length === 0) {
          dispatch(toastError("Pilihan personel tidak valid"));
          return;
        }

        personelId = personelId[0].id;
      } else {
        personelId = personel.id;
      }

      dispatch(
        ADD_ACCESS_RULE({
          lockId: lockId,
          personelId: personelId,
          startsAt: timeToAPIDateString(new Date(data.get("startdate"))),
          endsAt: timeToAPIDateString(new Date(data.get("enddate"))),
        })
      ).then((res) => {
        if (res.payload.error) {
          dispatch(toastError(res.payload.error));
        } else {
          dispatch(toastSuccess("Perubahan berhasil disimpan"));
          setStartDate(new Date().toLocaleDateString() + " 00:00");
          setEndDate(new Date().toLocaleDateString() + " 23:59");
        }
      });
    } else {
      lockId = accessRules[accessRuleIndex].lock_id;
      personelId = accessRules[accessRuleIndex].personel_id;

      dispatch(
        EDIT_ACCESS_RULE({
          accessRuleId: accessRules[accessRuleIndex].id,
          lockId: lockId,
          startsAt: timeToAPIDateString(new Date(data.get("startdate"))),
          endsAt: timeToAPIDateString(new Date(data.get("enddate"))),
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
        status: "any",
      })
    );

    if (withPersonelSelection) {
      dispatch(
        GET_PERSONELS({
          page: 1,
          limit: 1000,
          keyword: "",
          status: "any",
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
        <Grid
          container
          spacing={2}
          direction="column"
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid item>
            <Grid item direction="column" xs>
              {withPersonelSelection && (
                <SelectAutocomplete
                  disabled={accessRuleIndex >= 0}
                  id="personel"
                  name="personel"
                  label="Personel"
                  dataKey="name"
                  options={personels}
                  defaultValue={
                    accessRuleIndex >= 0
                      ? personels.filter(
                          (el) =>
                            el.id === accessRules[accessRuleIndex].personel_id
                        )[0]?.name
                      : null
                  }
                />
              )}
            </Grid>
          </Grid>
          <Grid item>
            <Grid item direction="column" xs>
              <SelectAutocomplete
                disabled={accessRuleIndex >= 0}
                id="lock"
                name="lock"
                label="Lock"
                dataKey="name"
                options={locks}
                defaultValue={
                  accessRuleIndex >= 0
                    ? locks.filter(
                        (el) => el.id === accessRules[accessRuleIndex].lock_id
                      )[0]?.name
                    : null
                }
              />
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
              type="submit"
              // onClick={() => simpanButton()}
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
