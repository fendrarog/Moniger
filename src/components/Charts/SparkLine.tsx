import React from "react";
import { LineChart, Line, Tooltip, YAxis } from "recharts";

// Типизировать CustomTooltip

const tooltipWidth = 100;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
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
          <p className="flex justify-center items-center py-1">
            <span className="text-gray-300">{`${label} :`}</span>
            <span className="ml-1 font-semibold">{`${payload[0].value}`}</span>
          </p>
        </div>
      </>
    );
  }
  return null;
};

interface SparkLineProps {
  currentColor: string;
  height: number;
  width: number;
  data: {
    x: number;
    yval: number;
  }[];
  color: string;
}

const SparkLine: React.FC<SparkLineProps> = ({
  currentColor,
  height,
  width,
  data,
  color,
}) => {
  return (
    <LineChart width={width} height={height} data={data}>
      <Line
        type="linear"
        dataKey="yval"
        strokeWidth={1}
        stroke={color}
        fill={color}
        dot={false}
        activeDot={false}
      />
      <Tooltip
        content={<CustomTooltip />}
        wrapperStyle={{ outline: "none" }}
        cursor={{ stroke: currentColor, strokeWidth: 1 }}
      />
      <YAxis type="number" domain={["auto", "auto"]} hide={true} />
    </LineChart>
  );
};

export default SparkLine;
