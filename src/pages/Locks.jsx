import React, { useState, useEffect } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import {
  CheckBoxSharp,
  CheckSharp,
  DownloadSharp,
  EditSharp,
  SpeedSharp,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { CHECK_LOCK, GET_LOCKS } from "../store/reducers/lockSlice";
import DataTable from "../components/DataTable";
import CellLink from "../components/CellLink";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DataTableFilterForm from "../components/DataTableFilterForm";
import { toastSuccess } from "../store/reducers/toastSlice";
import * as XLSX from "xlsx";
import { makeFilename } from "../utils/exportFilename";
import { getLocksRequest } from "../store/consumer";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Lock",
    path: "/lock",
  },
];

const Locks = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filter, setFilter] = useState({ keyword: "", status: "any" });

  const {
    value: { locks, pagination },
    status,
    error,
  } = useSelector((state) => state.lock);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckLock = (id) => {
    dispatch(CHECK_LOCK({ lockId: id })).then(() => {
      dispatch(toastSuccess("Pengecekan berhasil"));
      dispatch(
        GET_LOCKS({
          page: page,
          limit: limit,
          status: filter.status,
          keyword: filter.keyword,
        })
      );
    });
  };

  const columnDef = [
    { field: "index", headerName: "No.", width: 10, flex: 0.2 },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <CellLink href={`/lock/edit/${params.row.id}`}>
            {params.value}
          </CellLink>
        );
      },
    },
    {
      headerName: "Map",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <CellLink href={`/map/edit/${params.row?.plan?.id}`}>
            {params.row?.plan?.name}
          </CellLink>
        );
      },
    },
    { field: "location", headerName: "Location", flex: 0.5 },
    { field: "lock_id", headerName: "Lock ID", flex: 0.8 },
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
        <GridActionsCellItem
          color="success"
          icon={<EditSharp />}
          label="Edit"
          title="Edit"
          onClick={() => navigate(`/lock/edit/${params.row.id}`)}
        />,
        <GridActionsCellItem
          icon={<SpeedSharp />}
          label="Check"
          title="Check"
          color="info"
          onClick={() => handleCheckLock(params.row.id)}
        />,
      ],
    },
  ];

  const handlePageChange = (pageNum) => {
    setPage(pageNum + 1);
    dispatch(
      GET_LOCKS({
        page: pageNum + 1,
        limit: limit,
        status: filter.status,
        keyword: filter.keyword,
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    setLimit(pageSize);
    setPage(1);
    dispatch(
      GET_LOCKS({
        page: 1,
        limit: pageSize,
        status: filter.status,
        keyword: filter.keyword,
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    setFilter({
      keyword: data.get("keyword"),
      status: data.get("status"),
    });

    dispatch(
      GET_LOCKS({
        page: 1,
        limit: limit,
        status: data.get("status"),
        keyword: data.get("keyword"),
      })
    );
  };

  const handleExport = () => {
    getLocksRequest({
      page: 1,
      limit: -1,
      status: filter.status,
      keyword: filter.keyword,
    }).then(({ data }) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, makeFilename("locks"));
      dispatch(toastSuccess("Berhasil mengunduh"));
    });
  };

  useEffect(() => {
    dispatch(
      GET_LOCKS({
        page: pagination.page,
        limit: pagination.limit,
        status: filter.status,
        keyword: filter.keyword,
      })
    );
  }, []);

  return (
    <LoggedInLayout
      title="Kelola Lock"
      desc="Kelola lock-lock dalam sistem Anda"
      breadcrumbs={crumbs}
    >
      <DataTableFilterForm handleSearch={handleSearch}>
        <Button
          type="button"
          size="medium"
          variant="contained"
          color="primary"
          onClick={handleExport}
          startIcon={<DownloadSharp />}
        >
          Export
        </Button>
      </DataTableFilterForm>

      <DataTable
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        page={page - 1}
        limit={limit}
        loading={status === "pending"}
        total={pagination.total}
        columns={columnDef}
        rows={locks.map((e, i) => ({
          ...e,
          index: (page - 1) * limit + i + 1,
        }))}
      />
    </LoggedInLayout>
  );
};

export default Locks;
