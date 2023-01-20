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
  {
    name: "Personel",
    path: "/personel/edit",
  },
];

const EditPersonel = () => {
  return (
    <LoggedInLayout
      title="Edit Personel"
      desc="Ubah data personel yang terdaftar dalam sistem"
      breadcrumbs={crumbs}
    >
      <div>UNIMPLEMENTED</div>
    </LoggedInLayout>
  );
};

export default EditPersonel;
