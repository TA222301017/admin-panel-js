import { Box, Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_ACCESS_RULE,
  GET_ACCESS_RULES,
} from "../store/reducers/accessRuleSlice";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { AddSharp, DeleteForeverSharp, EditSharp } from "@mui/icons-material";
import { toastError, toastSuccess } from "../store/reducers/toastSlice";
import DataTableFilterForm from "./DataTableFilterForm";
import DataTable from "./DataTable";
import Modal from "@mui/material/Modal";
import CardPersonel from "./CardPersonel";
import { timeToPrettyTimeString } from "../utils/formatTime";
import CellLink from "./CellLink";

const AccessRuleTable = ({ personelId }) => {
  const {
    value: { accessRules, pagination },
    status,
  } = useSelector((state) => state.accessRule);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [modalOpen, setModalOpen] = useState(false);
  const [accessRuleIndex, setAccessRuleIndex] = useState(-1);
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  const columnDef = [
    { field: "index", headerName: "No.", width: 10, flex: 0.2 },
    {
      field: "lock",
      headerName: "Lock",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <CellLink href={`/lock/edit/${params.row.lock_id}`}>
            {params.value}
          </CellLink>
        );
      },
    },
    { field: "location", headerName: "Location", flex: 0.5 },
    {
      field: "starts_at",
      headerName: "Starts At",
      flex: 1,
      valueFormatter: (params) =>
        timeToPrettyTimeString(new Date(params.value)),
    },
    {
      field: "ends_at",
      headerName: "Ends At",
      flex: 1,
      valueFormatter: (params) =>
        timeToPrettyTimeString(new Date(params.value)),
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditSharp />}
          label="Edit"
          title="Edit"
          color="success"
          onClick={() => {
            setAccessRuleIndex(params.id - 1);
            setModalOpen(true);
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteForeverSharp />}
          label="Delete"
          title="Delete"
          color="error"
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
      GET_ACCESS_RULES({
        personelId: personelId,
        page: pageNum + 1,
        limit: limit,
      })
    );
  };

  const handlePageSizeChange = (pageSize) => {
    setLimit(pageSize);
    dispatch(
      GET_ACCESS_RULES({
        personelId: personelId,
        page: 1,
        limit: pageSize,
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);

    setPage(1);
    setKeyword(data.get("keyword"));
    dispatch(
      GET_ACCESS_RULES({
        personelId,
        page: 1,
        limit: limit,
      })
    ).then(() => {
      toastSuccess("Berhasil mengambil data terbaru");
    });
  };

  useEffect(() => {
    dispatch(
      GET_ACCESS_RULES({
        personelId: personelId,
        page: page,
        limit: limit,
      })
    );
  }, []);

  return (
    <>
      <DataTableFilterForm handleSearch={handleSearch} withoutStatus>
        <Button
          onClick={() => {
            setAccessRuleIndex(-1);
            setModalOpen(true);
          }}
          variant="contained"
          color="primary"
          startIcon={<AddSharp />}
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
        rows={accessRules.map((el, i) => ({
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
            accessRuleIndex={accessRuleIndex}
            setModalOpen={setModalOpen}
          />
        </Box>
      </Modal>
    </>
  );
};

export default AccessRuleTable;
