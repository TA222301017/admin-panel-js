import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { LOGIN } from "../store/reducers/userSlice";
import CardDashboard from "../components/CardDashboard";
import { Grid } from "@mui/material";
import { LockSharp, KeySharp, PersonSharp } from "@mui/icons-material";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
];

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // if (user.status !== "fulfilled") {
    dispatch(LOGIN({ username: "username", password: "password" }));
    // }
  }, []);

  return (
    <LoggedInLayout
      title="Dashboard"
      desc="Selamat datang di Admin Panels Sistem TA222301017"
      breadcrumbs={crumbs}
    >
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={3} md={4}>
          <CardDashboard Title={"Keys"} Value={123} Icon={<KeySharp />} />
        </Grid>
        <Grid item xs={3} md={4}>
          <CardDashboard Title={"Device"} Value={123} Icon={<LockSharp />} />
        </Grid>
        <Grid item xs={3} md={4}>
          <CardDashboard
            Title={"Personel"}
            Value={123}
            Icon={<PersonSharp />}
          />
        </Grid>
      </Grid>
    </LoggedInLayout>
  );
};

export default Dashboard;
