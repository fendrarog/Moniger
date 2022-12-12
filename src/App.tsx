import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar, Sidebar, ThemeSettings } from "./components";
import {
  Area,
  Bar,
  Calendar,
  ColorMapping,
  ColorPicker,
  Customers,
  Ecommerce,
  Editor,
  Employees,
  Financial,
  Kanban,
  Line,
  Orders,
  Pie,
  Pyramid,
  Stacked,
} from "./pages";
import { Tooltip } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useStateContext } from "./contexts/ContextProvider";

const App: React.FC = () => {
  const { activeMenu, setThemeSettings, currentColor, currentMode } =
    useStateContext();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
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
                onClick={() => setThemeSettings(true)}
              >
                <SettingsOutlinedIcon sx={{ fontSize: 30 }} />
              </button>
            </Tooltip>
          </div>

          <div
            className={`transition-[left] ease-linear duration-200 w-72 ${
              activeMenu ? "left-0" : "left-[-18rem]"
            } fixed sidebar dark:bg-secondary-dark-bg bg-white`}
          >
            <Sidebar />
          </div>

          <div
            className={`transition-[margin] ease-linear duration-200 dark:bg-main-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              <ThemeSettings />
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

                {/* Pages */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                {/* Apps */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* Charts */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
