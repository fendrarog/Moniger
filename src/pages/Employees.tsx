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
            borderBottom: `1px solid ${
              currentMode === "Light" ? "#A3A3A3" : "#D4D4D4"
            }`,
          },
          "& .css-1ptx2yq-MuiInputBase-root-MuiInput-root:hover:before": {
            borderBottom: `2px solid ${
              currentMode === "Light" ? "#52525B" : "#E5E5E5"
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
    <div className="p-2 md:p-10 dark:bg-[#20232a]">
      <div className="p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <Header category="Page" title="Employees" />

        <DataGrid
          localeText={enUS.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            "&.MuiDataGrid-root *:focus-within": {
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
    </div>
  );
};

export default Employees;
