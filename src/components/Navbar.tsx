import React from "react";
import { useEffect } from "react";
import { Tooltip } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import Cart from "./Cart";
import Chat from "./Chat";
import Notification from "./Notification";
import UserProfile from "./UserProfile";

const NavButton = ({ title, customFunc, icon, color, dotColor }: any) => (
  <Tooltip
    title={
      <p
        style={{
          fontSize: "12px",
          fontWeight: "400",
          fontFamily: "Open Sans, sans-serif",
        }}
      >
        {title}
      </p>
    }
    placement="bottom"
    arrow
  >
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="flex relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize) {
      if (screenSize <= 900) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    }
  }, [screenSize, setActiveMenu]);

  return (
    <div className="flex justify-between items-center p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color="blue"
        icon={<MenuOutlinedIcon />}
      />
      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color="blue"
          icon={<ShoppingCartOutlinedIcon />}
        />
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          color="blue"
          icon={<ChatBubbleOutlineOutlinedIcon />}
        />
        <NavButton
          title="Notification"
          dotColor="#03C9D7"
          customFunc={() => handleClick("notification")}
          color="blue"
          icon={<NotificationsOutlinedIcon />}
        />
        <Tooltip title="Profile" placement="bottom" arrow>
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}
          >
            <img alt="avatar" src={avatar} className="rounded-full w-8 h-8" />
            <p>
              <span className="text-gray-400 text-14">Hi, </span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">Paul</span>
            </p>
            <KeyboardArrowDownOutlinedIcon
              className="text-gray-400"
              sx={{ fontSize: 14 }}
            />
          </div>
        </Tooltip>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
