import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import FormEditKey from "../components/FormEditKey";

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
    name: "Edit",
    path: "/key/edit",
  },
];

const EditKey = () => {
  return (
    <LoggedInLayout
      title="Edit Key"
      desc="Ubah data kunci yang ada dalam sistem"
      breadcrumbs={crumbs}
    >
      <FormEditKey />
    </LoggedInLayout>
  );
};

export default EditKey;
