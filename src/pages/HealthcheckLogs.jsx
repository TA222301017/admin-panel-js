import React, { useEffect, useState } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/DataTable";
import Button from "@mui/material/Button";
import { CheckSharp } from "@mui/icons-material";
import DataTableFilterForm from "../components/DataTableFilterForm";
import { GET_HEALTHCHECK_LOG } from "../store/reducers/logSlice";

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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filter, setFilter] = useState({
    keyword: "",
    status: true,
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(23, 59, 59, 0)),
  });

  const {
    value: { healthcheck, pagination },
    status,
    error,
  } = useSelector((state) => state.log);

  const dispatch = useDispatch();

  const columnDef = [
    { field: "index", headerName: "No.", width: 10, flex: 0.2 },
    { field: "device", headerName: "Lock", flex: 0.5 },
    { field: "location", headerName: "Location", flex: 0.5 },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 1,
      valueFormatter: (params) => {
        return new Date(params.value).toString();
      },
    },
    {
      field: "status",
      type: "boolean",
      headerName: "Active",
      flex: 0.2,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem icon={<CheckSharp />} label="Check" showInMenu />,
      ],
    },
  ];

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    dispatch(
      GET_HEALTHCHECK_LOG({
        page: pageNum + 1,
        limit: limit,
        location: filter.keyword,
        status: filter.status,
        startDate: filter.startDate,
        endDate: filter.endDate,
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    setLimit(pageSize);
    setPage(1);
    dispatch(
      GET_HEALTHCHECK_LOG({
        page: 1,
        limit: pageSize,
        location: filter.keyword,
        status: filter.status,
        startDate: filter.startDate,
        endDate: filter.endDate,
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    setFilter({
      keyword: data.get("keyword"),
      status: data.get("status"),
      startDate: new Date(data.get("startdate")),
      endDate: new Date(data.get("enddate")),
    });
    dispatch(
      GET_HEALTHCHECK_LOG({
        page: 1,
        limit: limit,
        location: data.get("keyword"),
        status: data.get("status"),
        startDate: new Date(data.get("startdate")),
        endDate: new Date(data.get("enddate")),
      })
    );
  };

  useEffect(() => {
    dispatch(
      GET_HEALTHCHECK_LOG({
        page: pagination.page,
        limit: pagination.limit,
        location: filter.keyword,
        status: filter.status,
        startDate: filter.startDate,
        endDate: filter.endDate,
      })
    );
  }, []);

  return (
    <LoggedInLayout
      title="Healthcheck Logs"
      desc="Tinjau keadaan lock-lock dalam sistem Anda"
      breadcrumbs={crumbs}
    >
      <DataTableFilterForm
        handleSearch={handleSearch}
        withDate
        keywordLabel="Location"
      >
        <Button type="button" size="medium" variant="outlined">
          Export
        </Button>
      </DataTableFilterForm>

      <DataTable
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        page={page}
        limit={limit}
        loading={status === "pending"}
        total={pagination.total}
        columns={columnDef}
        rows={healthcheck.map((e, i) => ({
          ...e,
          index: page * limit + i + 1,
        }))}
      />
    </LoggedInLayout>
  );
};

export default HealthcheckLogs;
