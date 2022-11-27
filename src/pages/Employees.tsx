import React from "react";
import { Header } from "../components";
import Box from "@mui/material/Box";
import {
  DataGrid,
  enUS,
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  gridPaginationRowRangeSelector,
  gridPaginationSelector,
  GridRowHeightParams,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  ruRU,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { employeesData, employeesGrid } from "../data/dummy";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer className="flex justify-end">
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
};

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const { pageSize, page, pageCount, rowCount } = useGridSelector(
    apiRef,
    gridPaginationSelector
  );

  return (
    <div className="flex justify-between items-center w-full px-10">
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
        showFirstButton
        showLastButton
      />
      <div className="text-sm">
        {page + 1} of {pageCount} pages ({rowCount} items)
      </div>
    </div>
  );
};

const Employees: React.FC = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />

      <DataGrid
        localeText={enUS.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        rows={employeesData}
        columns={employeesGrid}
        rowHeight={70}
        loading={!employeesData.length}
        getRowId={(row) => row.EmployeeID}
        pageSize={12}
        rowsPerPageOptions={[12]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          Toolbar: CustomToolbar,
          Pagination: CustomPagination,
        }}
        disableColumnMenu
        disableColumnSelector
        autoHeight
      />
    </div>
  );
};

export default Employees;
