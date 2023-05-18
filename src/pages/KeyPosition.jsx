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
    name: "Position",
    path: "/key/position",
  },
];

const KeyPosition = () => {
  return (
    <LoggedInLayout
      title="Posisi Key"
      desc="Cari lokasi terbaru dari kunci-kunci dalam sistem Anda"
      breadcrumbs={crumbs}
    >
      <div>UNIMPLEMENTED</div>
    </LoggedInLayout>
  );
};

export default KeyPosition;
