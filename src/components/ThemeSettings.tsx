import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { themeColors } from "../data/dummy";
import { Tooltip } from "@mui/material";
import { useStateContext } from "../contexts/ContextProvider";

const ThemeSettings: React.FC = () => {
  const { currentColor, setColor, currentMode, setMode, setThemeSettings } =
    useStateContext();

  return (
    <div className="bg-half-transparent w-screen fixed nav-item top-0 right-0">
      <div className="float-right h-screen dark:text-gray-200 bg-white dark:[#484B52] w-400">
        <div className="flex justify-between items-center p-4 ml-4">
          <p className="font-semibold text-xl">Settings</p>
          <button
            type="button"
            onClick={() => {
              setThemeSettings(false);
            }}
            style={{ color: "rgb(153, 171,180)", borderRadius: "50%" }}
            className="flex text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <CancelOutlinedIcon />
          </button>
        </div>
        <div className="flex flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-lg">Theme Options</p>
          <div className="mt-4">
            <input
              type="radio"
              id="light"
              name="theme"
              value="Light"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Light"}
            />
            <label htmlFor="light" className="ml-2 cursor-pointer text-md">
              Light
            </label>
          </div>
          <div className="mt-4">
            <input
              type="radio"
              id="dark"
              name="theme"
              value="Dark"
              className="cursor-pointer"
              onChange={setMode}
              checked={currentMode === "Dark"}
            />
            <label htmlFor="dark" className="ml-2 cursor-pointer text-md">
              Dark
            </label>
          </div>
        </div>
        <div className="flex flex-col border-t-1 border-color p-4 ml-4">
          <p className="font-semibold text-lg">Theme Colors</p>
          <div className="flex gap-3">
            {themeColors.map((item, index) => (
              <Tooltip
                key={index}
                title={
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      fontFamily: "Open Sans, sans-serif",
                    }}
                  >
                    {item.name}
                  </p>
                }
                placement="top"
                arrow
              >
                <div className="relative mt-2 cursor-pointer flex gap-5">
                  <button
                    type="button"
                    className="flex items-center justify-center h-10 w-10 rounded-full cursor-pointer"
                    style={{ backgroundColor: item.color }}
                    onClick={() => setColor(item.color)}
                  >
                    <CheckOutlinedIcon
                      fontSize="small"
                      sx={{
                        display: `${
                          item.color === currentColor ? "block" : "none"
                        }`,
                      }}
                      className="text-white"
                    />
                  </button>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
