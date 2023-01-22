import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import FormEditLock from "../components/FormEditLock";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Lock",
    path: "/lock",
  },
  {
    name: "Edit",
    path: "/lock/edit",
  },
];

const EditLock = () => {
  return (
    <LoggedInLayout
      title="Edit Lock"
      desc="Ubah data lock yang ada dalam sistem"
      breadcrumbs={crumbs}
    >
      <FormEditLock />
    </LoggedInLayout>
  );
};

export default EditLock;
