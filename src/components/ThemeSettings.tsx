import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { themeColors } from "../data/dummy";
import { Tooltip } from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useStateContext } from "../contexts/ContextProvider";

const ThemeSettings: React.FC = () => {
  const {
    currentColor,
    setColor,
    currentMode,
    setMode,
    setThemeSettings,
    themeSettings,
  } = useStateContext();

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => setThemeSettings(false)}
    >
      <div>
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <Tooltip
            title={
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  fontFamily: "Open Sans, sans-serif",
                }}
              >
                Settings
              </p>
            }
            placement="left"
            arrow
          >
            <button
              type="button"
              className="p-3 hover:drop-shadow-xl hover:bg-light-gray text-white duration-300"
              style={{ background: `${currentColor}`, borderRadius: "50%" }}
              onClick={() => setThemeSettings((prev) => !prev)}
            >
              <SettingsOutlinedIcon sx={{ fontSize: 30 }} />
            </button>
          </Tooltip>
        </div>
        <div
          className={`w-350 h-screen dark:text-gray-200 bg-white dark:bg-[#484B52]  fixed nav-item transition-[right] ease-linear duration-200 top-0 ${
            themeSettings ? "right-0" : "right-[-350px]"
          }`}
        >
          <div className="flex justify-between items-center p-4 ml-4">
            <p className="font-semibold text-xl">Settings</p>
            <Tooltip
              title={
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    fontFamily: "Open Sans, sans-serif",
                    textTransform: "capitalize",
                  }}
                >
                  Close
                </p>
              }
              placement="left"
              arrow
            >
              <button
                type="button"
                onClick={() => {
                  setThemeSettings(false);
                }}
                style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
                className="flex text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray dark:hover:bg-[#7b808c]"
              >
                <CancelOutlinedIcon
                  sx={{
                    color: `${currentMode === "Dark" && "rgb(229 231 235)"}`,
                  }}
                />
              </button>
            </Tooltip>
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
                        textTransform: "capitalize",
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
    </ClickAwayListener>
  );
};

export default ThemeSettings;
