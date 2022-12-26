import React from "react";
import { Button } from ".";
import { chatData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Tooltip from "@mui/material/Tooltip";

const Notification = () => {
  const { currentColor, currentMode, handleCloseClick } = useStateContext();

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleCloseClick}
    >
      <div className="nav-item absolute right-5 md:right-40 top-16 bg-white dark:bg-[#42464D] sm:p-8 p-3 rounded-lg sm:w-96 w-64">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <p className="font-semibold text-lg dark:text-gray-200">
              Notifications
            </p>
            <button
              type="button"
              className="text-white text-xs rounded p-1 px-2 bg-orange-theme "
            >
              {" "}
              5 New
            </button>
          </div>
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
              onClick={handleCloseClick}
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
        <div className="mt-5 ">
          {chatData?.map((item, index) => (
            <div
              key={index}
              className="flex items-center leading-8 gap-5 border-b-1 border-color p-3"
            >
              <img
                className="rounded-full h-10 w-10"
                src={item.image}
                alt={item.message}
              />
              <div>
                <p className="font-semibold dark:text-gray-200">
                  {item.message}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {" "}
                  {item.desc}{" "}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-5">
            <Button
              color="white"
              bgColor={currentColor}
              text="See all notifications"
              borderRadius="10px"
              width="full"
            />
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Notification;
