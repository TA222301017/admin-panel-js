import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card, Grid, CardContent, CardHeader } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GET_LOCKS } from "../store/reducers/lockSlice";
import { toastError, toastSuccess } from "../store/reducers/toastSlice";
import { ADD_LOCK_TO_MAP } from "../store/reducers/mapSlice";
import { useParams } from "react-router-dom";
import { AddSharp } from "@mui/icons-material";

const CardLock = ({
  setModalOpen = () => null,
  setSelectedLockId = (id) => null,
}) => {
  const {
    value: { locks },
  } = useSelector((state) => state.lock);

  const dispatch = useDispatch();
  const { mapId } = useParams();

  const [lockId, setLockId] = useState(0);

  const simpanButton = () => {
    dispatch(
      ADD_LOCK_TO_MAP({
        lockId: lockId,
        mapId: mapId,
      })
    ).then((res) => {
      if (res.payload.error) {
        dispatch(toastError(res.payload.error));
      } else {
        dispatch(toastSuccess("Perubahan berhasil disimpan"));
        setModalOpen(false);
        setSelectedLockId(lockId);
      }
    });
  };

  useEffect(() => {
    dispatch(
      GET_LOCKS({
        page: 1,
        limit: 1000,
        keyword: "",
        status: "unused",
      })
    );
  }, []);

  return (
    <Card variant="outlined" style={{ marginTop: 0 }}>
      <CardHeader title="Add Lock to Map" />
      <CardContent>
        <Grid container spacing={2} direction="column" component="form">
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
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => simpanButton()}
              startIcon={<AddSharp />}
            >
              Tambah
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardLock;
