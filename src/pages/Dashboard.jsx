import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { asyncLogin } from "../store/user/userSlice";

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
    <LoggedInLayout>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </LoggedInLayout>
  );
};

export default Dashboard;
