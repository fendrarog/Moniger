import React, { useState } from "react";
import { Header } from "../components";
import {
  DataGrid,
  enUS,
  GridColDef,
  GridSelectionModel,
  ruRU,
} from "@mui/x-data-grid";
import {
  customersData,
  renderCustomerGridImage,
  renderCustomerGridStatus,
} from "../data/dummy";
import { IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import BasicPagination from "../components/BasicPagination";
import { useStateContext } from "../contexts/ContextProvider";
import CheckboxWrapper from "../components/Checkbox";
import { Tooltip } from "@mui/material";

const Customers: React.FC = () => {
  const { currentMode, currentColor } = useStateContext();

  const [customersRows, setCustomersRows] = useState(customersData);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const customersGrid: GridColDef[] = [
    {
      field: "CustomerName",
      headerName: "Name",
      width: 220,
      renderCell: renderCustomerGridImage,
      headerAlign: "center",
    },
    {
      field: "Name",
      headerName: "CustomerName",
      width: 0,
      headerAlign: "center",
      hide: true,
    },
    {
      field: "Email",
      headerName: "Email",
      width: 0,
      headerAlign: "center",
      hide: true,
    },
    {
      field: "ProjectName",
      headerName: "Project Name",
      width: 180,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: renderCustomerGridStatus,
    },
    {
      field: "Weeks",
      headerName: "Weeks",
      width: 100,
      align: "center",
      headerAlign: "center",
      editable: true,
      type: "number",
    },
    {
      field: "Budget",
      headerName: "Budget",
      width: 100,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "Location",
      headerName: "Location",
      width: 170,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "CustomerID",
      headerName: "Customer ID",
      width: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Delete",
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return (
          <Tooltip
            title={
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                Delete selected rows
              </p>
            }
            placement="top"
            arrow
          >
            <IconButton
              onClick={() => {
                const selectedIDs = new Set(selectionModel);
                setCustomersRows((r) =>
                  r.filter((x) => !selectedIDs.has(x.CustomerID))
                );
              }}
            >
              <DeleteOutlinedIcon
                style={{
                  color: `${currentColor}`,
                  animation: "3s infinite alternate slidein",
                }}
              />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Page" title="Customers" />

      <DataGrid
        localeText={enUS.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "& .css-ptiqhd-MuiSvgIcon-root": {
            fill: `${currentMode === "Light" ? "black" : "white"}`,
          },
          color: `${currentMode === "Light" ? "black" : "white"}`,
        }}
        rows={customersRows}
        columns={customersGrid}
        rowHeight={100}
        loading={!customersRows.length}
        getRowId={(row) => row.CustomerID}
        pageSize={12}
        rowsPerPageOptions={[12]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids);
        }}
        experimentalFeatures={{ newEditingApi: true }}
        components={{
          Pagination: BasicPagination,
          BaseCheckbox: CheckboxWrapper,
        }}
        disableColumnMenu
        disableColumnSelector
        autoHeight
      />
    </div>
  );
};

export default Customers;
