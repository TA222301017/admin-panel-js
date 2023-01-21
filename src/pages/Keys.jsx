import React, { useEffect, useState } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { GET_KEYS } from "../store/reducers/keySlice";
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
    name: "Key",
    path: "/key",
  },
];

const Keys = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const {
    value: { keys, pagination },
    status,
    error,
  } = useSelector((state) => state.key);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columnDef = [
    { field: "index", headerName: "No.", width: 10, flex: 0.2 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "key_id", headerName: "Key ID", flex: 1 },
    { field: "owner", headerName: "Owner", flex: 0.5 },
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
          onClick={() => navigate(`/key/edit/${params.id}`)}
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
    setPage(pageNum);
    dispatch(
      GET_KEYS({
        page: pageNum + 1,
        limit: limit,
        status: true,
        keyword: "",
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    setLimit(pageSize);
    setPage(1);
    dispatch(
      GET_KEYS({
        page: 1,
        limit: pageSize,
        status: true,
        keyword: "",
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let data = new FormData(e.target);
    console.log(data);
    dispatch(
      GET_KEYS({
        page: 1,
        limit: limit,
        status: data.get("status"),
        keyword: data.get("keyword"),
      })
    );
  };

  useEffect(() => {
    dispatch(
      GET_KEYS({
        page: pagination.page,
        limit: pagination.limit,
        status: true,
        keyword: "",
      })
    );
  }, []);

  return (
    <LoggedInLayout
      title="Keys List"
      desc="Kelola kunci-kunci dalam sistem Anda"
      breadcrumbs={crumbs}
    >
      <DataTableFilterForm handleSearch={handleSearch} />

      <DataTable
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        page={page}
        limit={limit}
        loading={status === "pending"}
        total={pagination.total}
        columns={columnDef}
        rows={keys.map((e, i) => ({ ...e, index: page * limit + i + 1 }))}
      />
    </LoggedInLayout>
  );
};

export default Keys;
