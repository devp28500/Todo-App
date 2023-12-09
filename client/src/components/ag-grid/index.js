import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.min.css";
import "ag-grid-community/styles/ag-theme-alpine.min.css";
import "./index.css";

const Aggrid = ({
  rowData = [],
  rowHeight = 42,
  domLayout = "autoHeight",
  columnDefs = [],
  suppressMovableColumns = true,
  ...props
}) => {
  return (
    <div className="ag-theme-alpine">
      <AgGridReact
        rowData={rowData}
        rowHeight={rowHeight}
        domLayout={domLayout}
        columnDefs={columnDefs}
        suppressMovableColumns={suppressMovableColumns}
        onGridReady={(params) => {
          params.api.sizeColumnsToFit();
        }}
        {...props}
      />
    </div>
  );
};

export default Aggrid;
