import React, { useEffect, useState } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { GET_PERSONELS } from "../store/reducers/personelSlice";
import Button from "@mui/material/Button";
import DataTable from "../components/DataTable";
import CellLink from "../components/CellLink";
import { useNavigate } from "react-router";
import {
  AddSharp,
  DownloadSharp,
  EditSharp,
  LocationSearchingSharp,
} from "@mui/icons-material";
import DataTableFilterForm from "../components/DataTableFilterForm";
import * as XLSX from "xlsx";
import { getPersonelsRequest } from "../store/consumer";
import { makeFilename } from "../utils/exportFilename";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Personel",
    path: "/personel",
  },
];

const Personels = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filter, setFilter] = useState({ keyword: "", status: "any" });

  const {
    value: { personels, pagination },
    status,
    error,
  } = useSelector((state) => state.personel);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columnDef = [
    { field: "index", headerName: "No.", width: 10, flex: 0.2 },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <CellLink href={`/personel/edit/${params.row.id}`}>
            {params.value}
          </CellLink>
        );
      },
    },
    {
      field: "key",
      headerName: "Key",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <CellLink href={`/key/edit/${params.row.key_id}`}>
            {params.value}
          </CellLink>
        );
      },
    },
    { field: "personel_id", headerName: "ID Number", flex: 0.8 },
    { field: "role", headerName: "Role", flex: 0.5 },
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
          icon={<EditSharp />}
          label="Edit"
          title="Edit"
          onClick={() => navigate(`/personel/edit/${params.row.id}`)}
        />,
        <GridActionsCellItem
          icon={<LocationSearchingSharp />}
          label="Locate"
          title="Locate"
          onClick={() => navigate(`/position-log?keyword=${params.row.name}`)}
        />,
      ],
    },
  ];

  const handlePageChange = (pageNum) => {
    setPage(pageNum + 1);
    dispatch(
      GET_PERSONELS({
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
      GET_PERSONELS({
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
      status: data.get("status"),
      keyword: data.get("keyword"),
    });
    dispatch(
      GET_PERSONELS({
        page: 1,
        limit: limit,
        status: data.get("status"),
        keyword: data.get("keyword"),
      })
    );
  };

  const handleExport = () => {
    getPersonelsRequest({
      page: 1,
      limit: -1,
      status: filter.status,
      keyword: filter.keyword,
    }).then(({ data }) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, makeFilename("personels"));
      dispatch(toastSuccess("Berhasil mengunduh"));
    });
  };

  useEffect(() => {
    dispatch(
      GET_PERSONELS({
        page: pagination.page,
        limit: pagination.limit,
        status: filter.status,
        keyword: filter.keyword,
      })
    );
  }, []);

  return (
    <LoggedInLayout
      title="Personel List"
      desc="Kelola personel-personel yang menggunakan sistem Anda"
      breadcrumbs={crumbs}
    >
      <DataTableFilterForm handleSearch={handleSearch}>
        <Button
          type="button"
          size="medium"
          variant="outlined"
          color="inherit"
          onClick={handleExport}
          startIcon={<DownloadSharp />}
        >
          Export
        </Button>

        <Button
          type="button"
          size="medium"
          variant="outlined"
          onClick={() => navigate("/personel/add")}
          color="inherit"
          startIcon={<AddSharp />}
        >
          Tambah
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
        rows={personels.map((e, i) => ({
          ...e,
          index: (page - 1) * limit + i + 1,
        }))}
      />
    </LoggedInLayout>
  );
};

export default Personels;
