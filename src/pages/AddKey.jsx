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
  {
    name: "Add",
    path: "/key/add",
  },
];

const AddKey = () => {
  return (
    <LoggedInLayout
      title="Add Key"
      desc="Daftarkan kunci baru ke dalam sistem"
      breadcrumbs={crumbs}
    >
      <div>UNIMPLEMENTED</div>
    </LoggedInLayout>
  );
};

export default AddKey;
