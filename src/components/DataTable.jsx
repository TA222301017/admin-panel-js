import React from "react";
import { DataGrid } from "@mui/x-data-grid";

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
  );
};

export default DataTable;
