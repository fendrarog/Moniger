import React from "react";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import Button from "./Button";
import { ClickAwayListener, Tooltip } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const UserProfile = () => {
  const { currentColor, currentMode, handleCloseClick } = useStateContext();

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleCloseClick}
    >
      <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] sm:p-8 p-3 rounded-lg sm:w-96 w-64">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg dark:text-gray-200">
            User Profile
          </p>
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
        <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
          <img
            className="rounded-full h-24 w-24"
            src={avatar}
            alt="user-profile"
          />
          <div>
            <p className="font-semibold text-xl dark:text-gray-200">
              {" "}
              Michael Roberts{" "}
            </p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              {" "}
              Administrator{" "}
            </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              {" "}
              info@shop.com{" "}
            </p>
          </div>
        </div>
        <div>
          {userProfileData.map((item, index) => (
            <div
              key={index}
              className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className=" text-xl rounded-lg p-3 hover:bg-light-gray"
              >
                {item.icon}
              </button>

              <div>
                <p className="font-semibold dark:text-gray-200 ">
                  {item.title}
                </p>
                <p className="text-gray-500 text-sm dark:text-gray-400">
                  {" "}
                  {item.desc}{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="Logout"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default UserProfile;
