import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { DASHBOARD, LOGIN } from "../store/reducers/userSlice";
import CardDashboard from "../components/CardDashboard";
import { Grid } from "@mui/material";
import { LockSharp, KeySharp, PersonSharp } from "@mui/icons-material";
import LoaderCover from "../components/LoaderCover";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
];

const Dashboard = () => {
  const {
    value: { dashboard },
    status,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DASHBOARD());
  }, []);

  return (
    <LoggedInLayout
      title="Dashboard"
      desc="Selamat datang di Admin Panel BlueGuard"
    >
      <LoaderCover show={status === "pending"} />

      {status === "fulfilled" && (
        <Grid container direction={"row"} spacing={5}>
          <Grid item xs={3} md={4}>
            <CardDashboard
              title={"Keys"}
              value={dashboard.key_cnt}
              icon={<KeySharp />}
              path="/key"
            />
          </Grid>
          <Grid item xs={3} md={4}>
            <CardDashboard
              title={"Locks"}
              value={dashboard.lock_cnt}
              icon={<LockSharp />}
              path="/lock"
            />
          </Grid>
          <Grid item xs={3} md={4}>
            <CardDashboard
              title={"Personel"}
              value={dashboard.personel_cnt}
              icon={<PersonSharp />}
              path="/personel"
            />
          </Grid>
        </Grid>
      )}
    </LoggedInLayout>
  );
};

export default Dashboard;
