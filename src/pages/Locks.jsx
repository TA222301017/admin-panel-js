import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Lock",
    path: "/lock",
  },
];

const Locks = () => {
  return (
    <LoggedInLayout
      title="Locks"
      desc="Kelola lock-lock dalam sistem Anda"
      breadcrumbs={crumbs}
    >
      <div>UNIMPLEMENTED</div>
    </LoggedInLayout>
  );
};

export default Locks;
