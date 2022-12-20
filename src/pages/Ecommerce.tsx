import React from "react";
import {
  earningData,
  sparklineAreaData,
  stackedChartData,
} from "../data/dummy";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  BarChartComponent,
  Button,
  PieChartComponent,
  SparkLine,
  Stacked,
} from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Ecommerce: React.FC = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="p-2 md:p-10 pt-12 dark:bg-[#20232a] min-h-screen">
      <div className="flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.78</p>
            </div>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
              size="lg"
            />
          </div>
        </div>

        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl"
            >
              <button
                type="button"
                style={{ color: item.iconColor, background: item.iconBg }}
                className="text-2xl opacity-90 p-4 rounded-full hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Revenue Updates</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:drop-shadow-xl">
                <span className="flex text-xs">
                  <FiberManualRecordIcon fontSize="inherit" />
                </span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span className="flex text-xs">
                  <FiberManualRecordIcon fontSize="inherit" />
                </span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className="flex gap-10 flex-wrap justify-center mt-10">
            <div className="sm:border-r-1 border-color m-4 sm:pr-10">
              <div>
                <p>
                  <span className="text-3xl font-semibold">$93,438</span>
                  <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-white bg-green-400 ml-3 text-xs">
                    23%
                  </span>
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <p>
                  <span className="text-3xl font-semibold">$48,438</span>
                </p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Expense</p>
              </div>

              <div className="mt-5">
                <SparkLine
                  currentColor={currentColor}
                  height={80}
                  width={250}
                  data={sparklineAreaData}
                  color={currentColor}
                />
              </div>
              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Report"
                  borderRadius="10px"
                  size="lg"
                />
              </div>
            </div>
            <div>
              <Stacked width={320} height={360} data={stackedChartData} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <div
            className="sm:w-400 rounded-2xl py-5 px-4 h-[220px]"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-start mt-4 mb-3 text-gray-200">
              <p className="font-bold text-2xl">Earnings</p>
              <div>
                <p className="font-bold text-2xl">$63,448.78</p>
                <p className="text-gray-300 text-md">Monthly revenue</p>
              </div>
            </div>
            <BarChartComponent />
          </div>

          <div className="flex justify-between items-center bg-white dark:text-gray-200 dark:bg-secondary-dark-bg sm:w-400 rounded-2xl py-5 px-4 mt-4 h-[220px]">
            <div>
              <p className="text-3xl font-semibold mr-6">$48,438</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Expense</p>
            </div>
            <PieChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
