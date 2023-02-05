import { Box, Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_ACCESS_RULE,
  GET_ALL_ACCESS_RULES,
} from "../store/reducers/accessRuleSlice";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { DeleteForeverSharp, EditSharp } from "@mui/icons-material";
import { toastError, toastSuccess } from "../store/reducers/toastSlice";
import DataTableFilterForm from "../components/DataTableFilterForm";
import DataTable from "../components/DataTable";
import Modal from "@mui/material/Modal";
import CardPersonel from "../components/CardPersonel";
import LoggedInLayout from "../layouts/LoggedInLayout";
import { getAllAccessRuleRequest } from "../store/consumer";
import * as XLSX from "xlsx";

const crumbs = [
  {
    name: "Home",
    path: "/dashboard",
  },
  {
    name: "Access Rule",
    path: "/access-rule",
  },
];

const AccessRule = () => {
  const {
    value: { accessRules, pagination },
    status,
  } = useSelector((state) => state.accessRule);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [modalOpen, setModalOpen] = useState(false);
  const [accessRuleIndex, setAccessRuleIndex] = useState(-1);

  const [filter, setFilter] = useState({
    keyword: "",
    startDate: new Date(new Date().toLocaleDateString() + " 00:00"),
    endDate: new Date(new Date().toLocaleDateString() + " 23:59"),
  });

  const dispatch = useDispatch();

  const columnDef = [
    { field: "index", headerName: "No.", width: 10, flex: 0.2 },
    { field: "personel", headerName: "Personel", flex: 0.5 },
    { field: "lock", headerName: "Lock", flex: 0.5 },
    { field: "location", headerName: "Location", flex: 0.5 },
    {
      field: "starts_at",
      headerName: "Starts At",
      flex: 0.5,
      valueFormatter: (params) => {
        return new Date(params.value).toString();
      },
    },
    {
      field: "ends_at",
      headerName: "Ends At",
      flex: 0.5,
      valueFormatter: (params) => {
        return new Date(params.value).toString();
      },
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditSharp />}
          label="Edit"
          title="Edit"
          onClick={() => {
            setAccessRuleIndex(params.id - 1);
            setModalOpen(true);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteForeverSharp />}
          label="Delete"
          onClick={() => {
            dispatch(
              DELETE_ACCESS_RULE({
                accessRuleId: params.row.id,
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
      ],
    },
  ];

  const handlePageChange = (pageNum) => {
    setPage(pageNum + 1);
    dispatch(
      GET_ALL_ACCESS_RULES({
        page: pageNum + 1,
        limit: limit,
        startDate: new Date(filter.startDate),
        endDate: new Date(filter.endDate),
        keyword: keyword,
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    setPage(1);
    setLimit(pageSize);
    dispatch(
      GET_ALL_ACCESS_RULES({
        page: 1,
        limit: pageSize,
        startDate: filter.startDate,
        endDate: filter.endDate,
        keyword: keyword,
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);

    setPage(1);
    setFilter({
      keyword: data.get("keyword"),
      startDate: new Date(data.get("startdate")),
      endDate: new Date(data.get("enddate")),
    });

    dispatch(
      GET_ALL_ACCESS_RULES({
        page: 1,
        limit: limit,
        startDate: new Date(data.get("startdate")),
        endDate: new Date(data.get("enddate")),
        keyword: data.get("keyword"),
      })
    );
  };

  const handleExport = () => {
    getAllAccessRuleRequest({
      page: 1,
      limit: -1,
      startDate: filter.startDate,
      endDate: filter.endDate,
      keyword: keyword,
    }).then(({ data }) => {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, makeFilename("access_rules"));
      dispatch(toastSuccess("Berhasil mengunduh"));
    });
  };

  useEffect(() => {
    dispatch(
      GET_ALL_ACCESS_RULES({
        page: page,
        limit: limit,
        startDate: filter.startDate,
        endDate: filter.endDate,
        keyword: "",
      })
    );
  }, []);

  return (
    <LoggedInLayout
      title="Access Rule"
      desc="Kelola peraturan akses yang berlaku dalam sistem Anda"
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
        <Button
          type="button"
          size="medium"
          variant="outlined"
          onClick={() => {
            setAccessRuleIndex(-1);
            setModalOpen(true);
          }}
          color="inherit"
        >
          Tambah
        </Button>
      </DataTableFilterForm>

      <DataTable
        page={page - 1}
        limit={limit}
        total={pagination.total}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        loading={status === "pending"}
        columns={columnDef}
        rows={accessRules?.map((el, i) => ({
          ...el,
          index: (page - 1) * limit + i + 1,
        }))}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <CardPersonel
            withPersonelSelection
            accessRuleIndex={accessRuleIndex}
            setModalOpen={setModalOpen}
          />
        </Box>
      </Modal>
    </LoggedInLayout>
  );
};

export default AccessRule;
