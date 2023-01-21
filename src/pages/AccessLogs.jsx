import React from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import AccessLogsList from "../components/AccessLogsList";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Access Logs",
    path: "/access-log",
  },
];

const AccessLogs = () => {
  return (
    <LoggedInLayout
      title="Access Logs"
      desc="Tinjau riwayat akses yang tercatat dalam sistem"
      breadcrumbs={crumbs}
    >
      <AccessLogsList />
      <div>UNIMPLEMENTED</div>
    </LoggedInLayout>
  );
};

export default AccessLogs;
