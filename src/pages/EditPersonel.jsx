import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Card, MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import FormEditPersonel from "../components/FormEditPersonel";

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
      <Grid container direction="row" spacing={1} columns={16}>
        <Grid>
          <FormEditPersonel />
        </Grid>

        <Grid>
          <div>test</div>
        </Grid>
      </Grid>
    </LoggedInLayout>
  );
};

export default EditPersonel;
