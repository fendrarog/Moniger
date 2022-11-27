import React, { useState } from "react";
import { Header } from "../components";
import Box from "@mui/material/Box";
import {
  DataGrid,
  enUS,
  GridColDef,
  gridPaginationSelector,
  GridSelectionModel,
  ruRU,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import {
  customersData,
  ordersGrid,
  renderCustomerGridImage,
  renderCustomerGridStatus,
} from "../data/dummy";
import { IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

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

const Customers: React.FC = () => {
  const [customersRows, setCustomersRows] = useState(customersData);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  console.log(selectionModel);

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
          <IconButton
            onClick={() => {
              const selectedIDs = new Set(selectionModel);
              setCustomersRows((r) =>
                r.filter((x) => !selectedIDs.has(x.CustomerID))
              );
            }}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />

      <DataGrid
        localeText={enUS.components.MuiDataGrid.defaultProps.localeText}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
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
          Pagination: CustomPagination,
        }}
        disableColumnMenu
        disableColumnSelector
        autoHeight
      />
    </div>
  );
};

export default Customers;
