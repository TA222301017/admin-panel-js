import React, { useEffect, useState } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { GET_PERSONELS } from "../store/reducers/personelSlice";
import Button from "@mui/material/Button";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router";
import { EditSharp, LocationSearchingSharp } from "@mui/icons-material";
import DataTableFilterForm from "../components/DataTableFilterForm";

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
  const [filter, setFilter] = useState({ keyword: "", status: true });

  const {
    value: { personels, pagination },
    status,
    error,
  } = useSelector((state) => state.personel);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columnDef = [
    { field: "index", headerName: "No.", width: 10, flex: 0.2 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "personel_id", headerName: "ID Number", flex: 1 },
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
          onClick={() => navigate(`/personel/edit/${params.id}`)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<LocationSearchingSharp />}
          label="Locate"
          onClick={() => navigate(`/key/location`)}
          showInMenu
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
        <Button type="button" size="medium" variant="outlined">
          Export
        </Button>

        <Button
          type="button"
          size="medium"
          variant="outlined"
          onClick={() => navigate("/personel/add")}
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
