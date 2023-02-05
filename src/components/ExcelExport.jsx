import React from "react";
import ReactExport from "react-export-excel-xlsx-fix";

const ExcelExport = ({ button, data, filename = "download", children }) => {
  const { ExcelFile, ExcelSheet } = ReactExport;

  return (
    <ExcelFile element={button} filename={filename} fileExtention=".xlsx">
      <ExcelSheet data={data}>{children}</ExcelSheet>
    </ExcelFile>
  );
};

export default ExcelExport;
