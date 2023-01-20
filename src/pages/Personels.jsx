import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Personel",
    path: "/personel",
  },
];

const Personels = () => {
  return (
    <LoggedInLayout
      title="Personel List"
      desc="Kelola personel-personel yang menggunakan sistem Anda"
      breadcrumbs={crumbs}
    >
      <div>UNIMPLEMENTED</div>
    </LoggedInLayout>
  );
};

export default Personels;
