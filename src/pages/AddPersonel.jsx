import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Personels",
    path: "/personel",
  },
  {
    name: "Add",
    path: "/personel/add",
  },
];

const AddPersonel = () => {
  return (
    <LoggedInLayout
      title="Add Personel"
      desc="Daftarkan personel baru ke dalam sistem"
      breadcrumbs={crumbs}
    >
      <div>UNIMPLEMENTED</div>
    </LoggedInLayout>
  );
};

export default AddPersonel;
