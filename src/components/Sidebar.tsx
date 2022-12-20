import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { links } from "../data/dummy";
import { Tooltip } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar: React.FC = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor, currentMode } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (screenSize) {
      if (activeMenu && screenSize < 1280) {
        setActiveMenu(false);
      }
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleCloseSideBar}
    >
      <div className="ml-3 h-screen xl:overflow-hidden overflow-auto xl:hover:overflow-auto pb-10">
        {activeMenu && (
          <>
            <div className="flex justify-between items-center">
              <Link
                to="/"
                onClick={handleCloseSideBar}
                className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
              >
                <SiShopware /> <span>Shoppy</span>
              </Link>

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
                placement="bottom"
                arrow
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveMenu((prevActiveMenu) => !prevActiveMenu);
                  }}
                  className="flex rounded-full text-[#99abb4] dark:text-[#E5E7EB] text-2xl p-3 mt-4 mr-3 hover:drop-shadow-xl hover:bg-light-gray dark:hover:bg-[#585f6b] xl:hidden"
                >
                  <CancelOutlinedIcon
                    sx={{
                      fontSize: 20,
                      color: `${currentMode === "Dark" && "rgb(229 231 235)"}`,
                    }}
                  />
                </button>
              </Tooltip>
            </div>
            <div className="mt-10">
              {links.map((item) => (
                <div key={item.title}>
                  <p className="text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.map((link) => (
                    <NavLink
                      to={`/${link.name}`}
                      key={link.name}
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : "",
                      })}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {link.icon}{" "}
                      <span className="capitalize">{link.name}</span>
                    </NavLink>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default Sidebar;
