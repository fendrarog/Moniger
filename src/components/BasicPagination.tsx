import React from "react";
import {
  gridPaginationSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@mui/styles";
import { useStateContext } from "../contexts/ContextProvider";

interface StyleProps {
  color: string;
  backgroundColor: string;
  mode: string;
}

const useStyles = makeStyles(() => ({
  ul: (props: StyleProps) => ({
    "& .MuiPaginationItem-root": {
      "&.Mui-selected": {
        color: props.color,
        backgroundColor: props.backgroundColor,
      },
    },
    "& .MuiButtonBase-root": {
      marginTop: "20px",
      marginBottom: "20px",
      color: `${props.mode === "Light" ? "black" : "white"}`,
    },
  }),
}));

const BasicPagination: React.FC = () => {
  const { currentColor, currentMode } = useStateContext();
  const props = {
    color: "white",
    backgroundColor: currentColor,
    mode: currentMode,
  };
  const classes = useStyles(props);
  const apiRef = useGridApiContext();
  const { page, pageCount, rowCount } = useGridSelector(
    apiRef,
    gridPaginationSelector
  );
  return (
    <div className="flex justify-between items-center w-full px-10">
      <Pagination
        classes={{ ul: classes.ul }}
        count={pageCount}
        page={page + 1}
        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
          apiRef.current.setPage(value - 1)
        }
        showFirstButton
        showLastButton
      />
      <div className="text-black dark:text-white text-sm sm:block hidden">
        {page + 1} of {pageCount} pages ({rowCount} items)
      </div>
    </div>
  );
};

export default BasicPagination;
