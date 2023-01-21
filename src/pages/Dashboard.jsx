import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { asyncLogin } from "../store/user/userSlice";
import Deposits from "../components/Deposits";
import { Grid, Paper } from "@mui/material";

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
    console.log("ASDF");
    if (user.status !== "fulfilled") {
      dispatch(asyncLogin({ username: "username", password: "password" }));
    }
  }, []);

  return (
    <LoggedInLayout
      title="Dashboard"
      desc="Selamat datang pada Admin-Panels Sistem Ta222301017"
      breadcrumbs={crumbs}
    ></LoggedInLayout>
  );
};

export default Dashboard;
