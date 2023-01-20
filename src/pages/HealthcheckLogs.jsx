import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Healthcheck Logs",
    path: "/healthcheck-log",
  },
];

const HealthcheckLogs = () => {
  return (
    <LoggedInLayout
      title="Healthcheck Logs"
      desc="Tinjau keadaan lock-lock dalam sistem Anda"
      breadcrumbs={crumbs}
    >
      <div>UNIMPLEMENTED</div>
    </LoggedInLayout>
  );
};

export default HealthcheckLogs;
