import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { LOGIN } from "../store/reducers/userSlice";

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
    ></LoggedInLayout>
  );
};

export default Dashboard;
