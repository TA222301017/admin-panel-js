import React, { useState, useEffect } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/DataTable";
import Button from "@mui/material/Button";
import { CheckSharp } from "@mui/icons-material";
import DataTableFilterForm from "../components/DataTableFilterForm";
import { GET_ACCESS_LOG } from "../store/reducers/logSlice";

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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filter, setFilter] = useState({
    keyword: "",
    status: true,
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(23, 59, 59, 0)),
  });

  const {
    value: { access, pagination },
    status,
    error,
  } = useSelector((state) => state.log);

  const dispatch = useDispatch();

  const columnDef = [
    { field: "index", headerName: "No.", width: 10, flex: 0.2 },
    { field: "personel", headerName: "Personel", flex: 0.5 },
    { field: "lock", headerName: "Lock", flex: 0.5 },
    { field: "key", headerName: "Key", flex: 0.5 },
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
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem icon={<CheckSharp />} label="Check" showInMenu />,
      ],
    },
  ];

  const handlePageChange = (pageNum) => {
    setPage(pageNum + 1);
    dispatch(
      GET_ACCESS_LOG({
        page: pageNum + 1,
        limit: limit,
        location: filter.keyword,
        personel: filter.keyword,
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
      GET_ACCESS_LOG({
        page: 1,
        limit: pageSize,
        location: filter.keyword,
        personel: filter.keyword,
        status: filter.status,
        startDate: filter.startDate,
        endDate: filter.endDate,
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);

    setPage(1);
    setFilter({
      keyword: data.get("keyword"),
      status: data.get("status"),
      startDate: new Date(data.get("startdate")),
      endDate: new Date(data.get("enddate")),
    });

    dispatch(
      GET_ACCESS_LOG({
        page: 1,
        limit: limit,
        location: data.get("keyword"),
        personel: data.get("keyword"),
        status: data.get("status"),
        startDate: new Date(data.get("startdate")),
        endDate: new Date(data.get("enddate")),
      })
    );
  };

  useEffect(() => {
    dispatch(
      GET_ACCESS_LOG({
        page: pagination.page,
        limit: pagination.limit,
        startDate: filter.startDate,
        endDate: filter.endDate,
        personel: filter.keyword,
        location: filter.keyword,
      })
    );
  }, []);

  return (
    <LoggedInLayout
      title="Access Logs"
      desc="Tinjau riwayat akses yang tercatat dalam sistem"
      breadcrumbs={crumbs}
    >
      <DataTableFilterForm withDate withoutStatus handleSearch={handleSearch}>
        <Button type="button" size="medium" variant="outlined" color="inherit">
          Export
        </Button>
      </DataTableFilterForm>
      <DataTable
        page={page - 1}
        limit={limit}
        total={pagination.total}
        loading={status === "pending"}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        columns={columnDef}
        rows={access.map((el, i) => ({
          ...el,
          index: (page - 1) * limit + i + 1,
        }))}
      />
    </LoggedInLayout>
  );
};

export default AccessLogs;
