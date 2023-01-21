import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import PersonelList from "../components/PersonelList";

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
      <PersonelList />
    </LoggedInLayout>
  );
};

export default Personels;
