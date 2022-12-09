import React from "react";
import { Header } from "../components";
import {
  DataGrid,
  enUS,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  ruRU,
} from "@mui/x-data-grid";
import { employeesData, employeesGrid } from "../data/dummy";
import BasicPagination from "../components/BasicPagination";
import { useStateContext } from "../contexts/ContextProvider";

const CustomToolbar = () => {
  const { currentMode, currentColor } = useStateContext();
  return (
    <GridToolbarContainer className="flex justify-end">
      <GridToolbarQuickFilter
        sx={{
          "& .MuiInputBase-root": {
            color: `${currentMode === "Light" ? "black" : "white"}`,
          },
          "& .MuiButtonBase-root": {
            color: `${currentMode === "Light" ? "black" : "white"}`,
          },
          "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root:after": {
            borderBottom: `2px solid ${currentColor}`,
          },
          "& .MuiInput-underline:before": {
            borderBottom: `0.5px solid ${
              currentMode === "Light" ? "#3F3F46" : "#A1A1AA"
            }`,
          },
          "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root:hover:before": {
            borderBottom: `2px solid ${
              currentMode === "Light" ? "black" : "white"
            }`,
          },
        }}
      />
    </GridToolbarContainer>
  );
};

const Employees: React.FC = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Page" title="Employees" />

      <DataGrid
        localeText={enUS.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          "& .MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "& .css-ptiqhd-MuiSvgIcon-root": {
            fill: `${currentMode === "Light" ? "black" : "white"}`,
          },
          color: `${currentMode === "Light" ? "black" : "white"}`,
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
          Pagination: BasicPagination,
        }}
        disableColumnMenu
        disableColumnSelector
        autoHeight
      />
    </div>
  );
};

export default Employees;
