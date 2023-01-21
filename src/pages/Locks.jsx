import React, { useState, useEffect } from "react";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { useNavigate } from "react-router";
import { CheckSharp, EditSharp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { GET_LOCKS } from "../store/reducers/lockSlice";
import DataTable from "../components/DataTable";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DataTableFilterForm from "../components/DataTableFilterForm";

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

  const {
    value: { locks, pagination },
    status,
    error,
  } = useSelector((state) => state.lock);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckLock = (id) => {
    // dispatch(CHEC)
  };

  const columnDef = [
    { field: "index", headerName: "No.", width: 10, flex: 0.2 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "ip_address", headerName: "IP Address", flex: 0.5 },
    { field: "location", headerName: "Location", flex: 0.8 },
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
          onClick={() => navigate(`/lock/edit/${params.id}`)}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<CheckSharp />}
          label="Check"
          onClick={() => handleCheckLock(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    dispatch(
      GET_LOCKS({
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
      GET_LOCKS({
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
      GET_LOCKS({
        page: 1,
        limit: limit,
        status: data.get("status"),
        keyword: data.get("keyword"),
      })
    );
  };

  useEffect(() => {
    dispatch(
      GET_LOCKS({
        page: pagination.page,
        limit: pagination.limit,
        status: true,
        keyword: "",
      })
    );
  }, []);

  return (
    <LoggedInLayout
      title="Locks"
      desc="Kelola lock-lock dalam sistem Anda"
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
        rows={locks.map((e, i) => ({ ...e, index: page * limit + i + 1 }))}
      />
    </LoggedInLayout>
  );
};

export default Locks;
