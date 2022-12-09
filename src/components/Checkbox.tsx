import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useStateContext } from "../contexts/ContextProvider";

const CheckboxWrapper = React.forwardRef((props, ref) => {
  const { currentColor } = useStateContext();
  return (
    <Checkbox
      sx={{
        color: `${currentColor}`,
        "&.Mui-checked": {
          color: `${currentColor}`,
        },
      }}
      {...props}
    />
  );
});

export default CheckboxWrapper;
