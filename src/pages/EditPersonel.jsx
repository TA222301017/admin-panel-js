import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { Grid } from "@mui/material";
import FormEditPersonel from "../components/FormEditPersonel";
import CardPersonel from "../components/CardPersonel";

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
      <Grid container direction="row" spacing={5}>
        <Grid
          item
          xs={"auto"}
          direction="column"
          style={{
            display: "flex",
            flexFlow: "column wrap",
            gap: "20px",
            paddingTop: 0,
            marginTop: "60px",
          }}
        >
          <FormEditPersonel />
        </Grid>

        <Grid
          item
          xs={6}
          direction="column"
          style={{
            display: "flex",
            flexFlow: "column wrap",
            gap: "20px",
            paddingTop: 0,
            marginTop: "75px",
          }}
        >
          <CardPersonel />
          <CardPersonel />
          <CardPersonel />
          <CardPersonel />
          <CardPersonel />
        </Grid>
      </Grid>
    </LoggedInLayout>
  );
};

export default EditPersonel;
