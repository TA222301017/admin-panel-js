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
}) => {
  return (
    <DataGrid
      autoHeight
      getRowId={(row) => page * limit + row.index}
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
    />
  );
};

export default DataTable;
