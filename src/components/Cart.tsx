import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { useStateContext } from "../contexts/ContextProvider";
import { cartData } from "../data/dummy";
import { Button } from ".";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Tooltip from "@mui/material/Tooltip";

const Cart = () => {
  const { currentColor, currentMode, handleCloseClick, isClicked } =
    useStateContext();

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleCloseClick}
    >
      <div
        className={`w-350 sm:p-8 p-3 dark:text-gray-200 bg-white dark:bg-[#484B52] fixed nav-item transition-[right] ease-linear duration-200 top-0 h-screen ${
          isClicked.cart ? "right-0" : "right-[-414px]"
        }`}
      >
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Shopping Cart</p>
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
        {cartData?.map((item, index) => (
          <div key={index}>
            <div>
              <div className="flex items-center   leading-8 gap-5 border-b-1 border-color dark:border-gray-600 p-4">
                <img className="rounded-lg h-80 w-24" src={item.image} alt="" />
                <div>
                  <p className="font-semibold ">{item.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                    {item.category}
                  </p>
                  <div className="flex gap-4 mt-2 items-center">
                    <p className="font-semibold text-lg">{item.price}</p>
                    <div className="flex items-center border-1 border-r-0 border-color rounded">
                      <p className="p-2 border-r-1 dark:border-gray-600 border-color text-red-600 ">
                        <AiOutlineMinus />
                      </p>
                      <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">
                        0
                      </p>
                      <p className="p-2 border-r-1 border-color dark:border-gray-600 text-green-600">
                        <AiOutlinePlus />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-3 mb-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
            <p className="font-semibold">$890</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 dark:text-gray-200">Total</p>
            <p className="font-semibold">$890</p>
          </div>
        </div>
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="Place Order"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default Cart;
