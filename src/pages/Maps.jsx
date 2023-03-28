import React, { useEffect, useState } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_MAP, GET_MAPS } from "../store/reducers/mapSlice";
import Button from "@mui/material/Button";
import DataTable from "../components/DataTable";
import CellLink from "../components/CellLink";
import { useNavigate } from "react-router";
import {
  AddSharp,
  DeleteSharp,
  DownloadSharp,
  EditSharp,
  LocationSearchingSharp,
} from "@mui/icons-material";
import DataTableFilterForm from "../components/DataTableFilterForm";
import * as XLSX from "xlsx";
import { getPersonelsRequest } from "../store/consumer";
import { timeToPrettyTimeString } from "../utils/formatTime";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Maps",
    path: "/map",
  },
];

const Maps = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [filter, setFilter] = useState({ keyword: "", status: "any" });

  const {
    value: { maps, pagination },
    status,
    error,
  } = useSelector((state) => state.map);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columnDef = [
    { field: "index", headerName: "No.", width: 10, flex: 0.1 },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <CellLink href={`/map/edit/${params.row.id}`}>
            {params.value}
          </CellLink>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.4,
      valueFormatter: (params) => {
        return timeToPrettyTimeString(new Date(params.value));
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.2,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditSharp />}
          label="Edit"
          title="Edit"
          onClick={() => navigate(`/map/edit/${params.row.id}`)}
        />,
        <GridActionsCellItem
          icon={<DeleteSharp />}
          label="Delete"
          title="Delete"
          onClick={() => {
            dispatch(
              DELETE_MAP({
                mapId: params.row.id,
              })
            ).then((res) => {
              if (res.payload.error) {
                dispatch(toastError("Gagal menghapus data"));
              } else {
                dispatch(toastSuccess("Data berhasil dihapus"));
              }
            });
          }}
        />,
        <GridActionsCellItem
          icon={<LocationSearchingSharp />}
          label="Locate"
          onClick={() => navigate(`/map/positioning/${params.row.id}`)}
        />,
      ],
    },
  ];

  const handlePageChange = (pageNum) => {
    setPage(pageNum + 1);
    dispatch(
      GET_MAPS({
        page: pageNum + 1,
        limit: limit,
        keyword: filter.keyword,
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    setLimit(pageSize);
    setPage(1);
    dispatch(
      GET_MAPS({
        page: 1,
        limit: pageSize,
        keyword: filter.keyword,
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    setFilter({
      keyword: data.get("keyword"),
    });
    dispatch(
      GET_MAPS({
        page: 1,
        limit: limit,
        keyword: data.get("keyword"),
      })
    );
  };

  const handleExport = () => {
    getPersonelsRequest({
      page: 1,
      limit: -1,
      keyword: filter.keyword,
    }).then(({ data }) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, makeFilename("maps"));
      dispatch(toastSuccess("Berhasil mengunduh"));
    });
  };

  useEffect(() => {
    dispatch(
      GET_MAPS({
        page: pagination.page,
        limit: pagination.limit,
        status: filter.status,
        keyword: filter.keyword,
      })
    );
  }, []);

  return (
    <LoggedInLayout
      title="Maps List"
      desc="Kelola denah-denah dalam sistem Anda"
      breadcrumbs={crumbs}
    >
      <DataTableFilterForm handleSearch={handleSearch} withoutStatus>
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
          onClick={() => navigate("/map/add")}
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
        total={pagination ? pagination.total : 0}
        columns={columnDef}
        rows={maps.map((e, i) => ({
          ...e,
          index: (page - 1) * limit + i + 1,
        }))}
      />
    </LoggedInLayout>
  );
};

export default Maps;
