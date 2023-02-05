import React, { useState, useEffect } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/DataTable";
import Button from "@mui/material/Button";
import { CheckSharp } from "@mui/icons-material";
import DataTableFilterForm from "../components/DataTableFilterForm";
import { GET_RSSI_LOG } from "../store/reducers/logSlice";
import * as XLSX from "xlsx";
import { getRSSILogRequest } from "../store/consumer";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Position Logs",
    path: "/position-log",
  },
];

const RSSILogs = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filter, setFilter] = useState({
    keyword: "",
    startDate: new Date(new Date().setHours(0, 0, 0, 0)),
    endDate: new Date(new Date().setHours(23, 59, 59, 0)),
  });

  const {
    value: { rssi, pagination },
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
      field: "rssi",
      headerName: "RSSI",
      flex: 0.5,
      valueFormatter: (params) => `${params.value}dB`,
    },
    {
      field: "timestamp",
      headerName: "Timestamp",
      flex: 1,
      valueFormatter: (params) => {
        return new Date(params.value).toString();
      },
    },
    // {
    //   field: "actions",
    //   type: "actions",
    //   getActions: (params) => [
    //     <GridActionsCellItem icon={<CheckSharp />} label="Check" showInMenu />,
    //   ],
    // },
  ];

  const handlePageChange = (pageNum) => {
    setPage(pageNum + 1);
    dispatch(
      GET_RSSI_LOG({
        page: pageNum + 1,
        limit: limit,
        keyword: filter.keyword,
        startDate: filter.startDate,
        endDate: filter.endDate,
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    setLimit(pageSize);
    setPage(1);
    dispatch(
      GET_RSSI_LOG({
        page: 1,
        limit: pageSize,
        keyword: filter.keyword,
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
      startDate: new Date(data.get("startdate")),
      endDate: new Date(data.get("enddate")),
    });

    dispatch(
      GET_RSSI_LOG({
        page: 1,
        limit: limit,
        keyword: data.get("keyword"),
        startDate: new Date(data.get("startdate")),
        endDate: new Date(data.get("enddate")),
      })
    );
  };

  const handleExport = () => {
    getRSSILogRequest({
      page: 1,
      limit: -1,
      startDate: filter.startDate,
      endDate: filter.endDate,
      keyword: filter.keyword,
    }).then(({ data }) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, makeFilename("rssi_log"));
      dispatch(toastSuccess("Berhasil mengunduh"));
    });
  };

  useEffect(() => {
    dispatch(
      GET_RSSI_LOG({
        page: pagination.page,
        limit: pagination.limit,
        startDate: filter.startDate,
        endDate: filter.endDate,
        keyword: filter.keyword,
      })
    );
  }, []);

  return (
    <LoggedInLayout
      title="Position Logs"
      desc="Tinjau riwayat posisi personel-personel dalam sistem"
      breadcrumbs={crumbs}
    >
      <DataTableFilterForm withDate withoutStatus handleSearch={handleSearch}>
        <Button
          type="button"
          size="medium"
          variant="outlined"
          color="inherit"
          onClick={handleExport}
        >
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
        rows={rssi.map((el, i) => ({
          ...el,
          index: (page - 1) * limit + i + 1,
        }))}
      />
    </LoggedInLayout>
  );
};

export default RSSILogs;
