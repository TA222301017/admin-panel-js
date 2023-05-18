import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

const DataTable = ({
  columns,
  rows,
  page,
  limit,
  total,
  onPageChange,
  onPageSizeChange,
  loading,
  toolbar = null,
}) => {
  return (
    <Paper elevation={3}>
      <DataGrid
        autoHeight
        getRowId={(row) => row.index}
        paginationMode="server"
        rowCount={total}
        loading={loading}
        rows={rows}
        columns={columns}
        pageSize={limit}
        page={page}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        rowsPerPageOptions={[10, 20, 50, 100]}
        components={{
          Toolbar: toolbar,
        }}
      />
    </Paper>
  );
};

export default DataTable;
