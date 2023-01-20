import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Key",
    path: "/key",
  },
];

const Keys = () => {
  return (
    <LoggedInLayout
      title="Keys List"
      desc="Kelola kunci-kunci dalam sistem Anda"
      breadcrumbs={crumbs}
    >
      <div>UNIMPLEMENTED</div>
    </LoggedInLayout>
  );
};

export default Keys;
