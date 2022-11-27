import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { TooltipProps } from "recharts/types/component/Tooltip";

const findDataMin = (data: StackedProps["data"]): number => {
  const filteredData = data.map((item) => item[Object.keys(item)[1]] as number);

  const dataMin = filteredData.reduce((min, item) => (min < item ? min : item));

  return Math.floor(dataMin / 100) * 100;
};

interface DataItem {
  x: string;
  y: number;
  z: number;
}

interface StackedProps {
  height: number;
  width: number;
  data: DataItem[];
}

const Stacked: React.FC<StackedProps> = ({ width, height, data }) => {
  const [processedData, setProcessedData] = useState(data);
  const [posData, setPosData] = useState({ x: 0, y: 0, width: 0 });
  const [clickNumber, setСlickNumber] = useState({ y: 0, z: 0 });
  const [activeBar, setActiveBar] = useState<"Budget" | "Expense" | undefined>(
    undefined
  );
  const [activeIndex, setActiveIndex] = useState<
    Record<string, number> | undefined
  >(undefined);

  const tooltipWidth = 100;

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length && activeBar) {
      return (
        <>
          <div
            style={{
              width: `${tooltipWidth}px`,
              borderRadius: "0.25em",
              backgroundColor: "#000",
              color: "#fff",
              opacity: "0.8",
              padding: "0.3rem 0.5rem",
              boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.5)",
              textAlign: "center",
            }}
          >
            {activeBar === "Expense" ? (
              <>
                <p className="pb-1 border-b-1 font-semibold">Expense</p>
                <p className="flex items-center mt-1">
                  <span className="flex text-xs text-gray-600">
                    <FiberManualRecordIcon fontSize="inherit" />
                  </span>
                  <span className="ml-1 text-gray-300">{`${label} :`}</span>
                  <span className="ml-1 font-semibold">{`${payload[1].value}`}</span>
                </p>
              </>
            ) : (
              <>
                <p className="pb-1 border-b-1 font-semibold">Budget</p>
                <p className="flex items-center mt-1">
                  <span className="flex text-xs text-green-400">
                    <FiberManualRecordIcon fontSize="inherit" />
                  </span>
                  <span className="ml-1 text-gray-300">{`${label} :`}</span>
                  <span className="ml-1 font-semibold">{`${payload[0].value}`}</span>
                </p>
              </>
            )}
          </div>
          <div className="flex justify-center relative bottom-0.1">
            <div
              style={{
                width: "0",
                height: "0",
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "9.5px solid #000",
                opacity: "0.7",
              }}
            ></div>
          </div>
        </>
      );
    }
    return null;
  };

  // Типизировать handleClick ------------------------------------

  const handleClick = (o: any) => {
    const { dataKey } = o;
    console.log(o);
    console.log(`Expense --- ${clickNumber[Object.keys(clickNumber)[1]]}`);
    console.log(`Budget --- ${clickNumber[Object.keys(clickNumber)[0]]}`);

    const handleData = (item: DataItem) => {
      let processedItem = {} as DataItem;

      if (clickNumber[dataKey as keyof typeof clickNumber] % 2) {
        return item;
      }

      for (let key in item) {
        if (
          typeof item[key as keyof DataItem] !== "string" &&
          key !== dataKey
        ) {
          processedItem = { ...item, [key]: 0 };
        }
      }
      return processedItem;
    };

    const handleClickСount = (clickNumber: { y: number; z: number }) => {
      let newClick = {} as typeof clickNumber;
      for (let key in clickNumber) {
        if (key === dataKey) {
          newClick = {
            ...newClick,
            [key]: clickNumber[key as keyof typeof clickNumber] + 1,
          };
        } else {
          newClick = { ...newClick, [key]: 0 };
        }
      }
      return newClick;
    };

    setProcessedData(data.map(handleData));

    setСlickNumber(handleClickСount(clickNumber));
  };

  // Типизировать handleMouseOver ------------------------------------

  const handleMouseOver = (data: any, index: number) => {
    setActiveIndex({ [data.tooltipPayload[0].id]: index });
    console.log([data.tooltipPayload[0].id]);
  };

  const dataMin = useMemo(() => findDataMin(processedData), [processedData]);

  return (
    <div className="text-xs">
      <BarChart width={width} height={height} data={processedData}>
        <CartesianGrid opacity={0.7} vertical={false} />
        <XAxis dataKey="x" tickLine={false} opacity={0.7} />
        <YAxis
          axisLine={false}
          tickLine={false}
          allowDataOverflow={true}
          domain={
            (clickNumber[Object.keys(clickNumber)[0]] >= 0 &&
              clickNumber[Object.keys(clickNumber)[0]] % 2 !== 0) ||
            (clickNumber[Object.keys(clickNumber)[1]] >= 0 &&
              clickNumber[Object.keys(clickNumber)[1]] % 2 !== 0)
              ? [0, (dataMax: number) => Math.ceil(dataMax / 100) * 100]
              : [
                  () => dataMin,
                  (dataMax: number) => Math.ceil(dataMax / 100) * 100,
                ]
          }
          width={30}
          opacity={0.7}
        />
        <Tooltip
          content={<CustomTooltip />}
          wrapperStyle={{ outline: "none" }}
          cursor={false}
          position={{
            x: posData.x - tooltipWidth / 2 + posData.width / 2,
            y: posData.y - 60,
          }}
        />
        <Legend
          formatter={(value: keyof DataItem, entry, index) => {
            const { color } = entry;
            console.log(entry);

            if (value === "z") {
              const opacity =
                clickNumber[Object.keys(clickNumber)[1]] % 2 ? 0.5 : 1;
              return (
                <span
                  className="hover:drop-shadow-xl cursor-pointer"
                  style={{ color, opacity }}
                >
                  Expense
                </span>
              );
            }
            if (value === "y") {
              const opacity =
                clickNumber[Object.keys(clickNumber)[0]] % 2 ? 0.5 : 1;
              return (
                <span
                  className="hover:drop-shadow-xl cursor-pointer"
                  style={{ color, opacity }}
                >
                  Budget
                </span>
              );
            }
          }}
          iconType="rect"
          onClick={handleClick}
        />
        <Bar
          id="budget-bar"
          onMouseOver={(data, index) => {
            setPosData(data);
            setActiveBar("Budget");
            handleMouseOver(data, index);
          }}
          onMouseLeave={() => {
            setActiveBar(undefined);
            setActiveIndex(undefined);
          }}
          dataKey="y"
          stackId="a"
          fill="rgb(74 222 128)"
        >
          {processedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              cursor="pointer"
              opacity={
                activeIndex && index === activeIndex["budget-bar"] ? 0.75 : 1
              }
            />
          ))}
        </Bar>

        <Bar
          id="expense-bar"
          onMouseOver={(data, index) => {
            setPosData(data);
            setActiveBar("Expense");
            handleMouseOver(data, index);
          }}
          onMouseLeave={() => {
            setActiveBar(undefined);
            setActiveIndex(undefined);
          }}
          dataKey="z"
          stackId="a"
          fill="rgb(75 85 99)"
        >
          {processedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              cursor="pointer"
              opacity={
                activeIndex && index === activeIndex["expense-bar"] ? 0.75 : 1
              }
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default Stacked;
