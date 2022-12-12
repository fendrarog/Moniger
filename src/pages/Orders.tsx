import React from "react";
import { Header } from "../components";
import {
  DataGrid,
  enUS,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  ruRU,
} from "@mui/x-data-grid";
import { ordersData, ordersGrid } from "../data/dummy";
import BasicPagination from "../components/BasicPagination";
import { useStateContext } from "../contexts/ContextProvider";

const CustomToolbar = () => {
  const { currentColor } = useStateContext();

  return (
    <GridToolbarContainer className="flex justify-between">
      <div>
        <GridToolbarFilterButton style={{ color: `${currentColor}` }} />
        <GridToolbarExport style={{ color: `${currentColor}` }} />
      </div>
    </GridToolbarContainer>
  );
};

const Orders: React.FC = () => {
  const { currentMode } = useStateContext();

  return (
    <div className="p-2 md:p-10 dark:bg-[#20232a]">
      <div className="p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <Header category="Page" title="Orders" />

        <DataGrid
          localeText={
            (enUS.components.MuiDataGrid.defaultProps.localeText,
            {
              toolbarFilters: "filter",
              toolbarExport: "Download or print",
            })
          }
          sx={{
            "&.MuiDataGrid-root *:focus-within": {
              outline: "none !important",
            },
            "& .css-ptiqhd-MuiSvgIcon-root": {
              fill: `${currentMode === "Light" ? "black" : "white"}`,
            },
            color: `${currentMode === "Light" ? "black" : "white"}`,
          }}
          rows={ordersData}
          columns={ordersGrid}
          rowHeight={100}
          loading={!ordersData.length}
          getRowId={(row) => row.OrderID}
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

export default Orders;
