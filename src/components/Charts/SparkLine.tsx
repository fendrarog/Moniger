import React from "react";
import { LineChart, Line, Tooltip, YAxis } from "recharts";

// Типизировать CustomTooltip

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    return (
      <div
        style={{
          borderRadius: "0.25em",
          backgroundColor: "#000",
          color: "#fff",
          opacity: "0.6",
          padding: "0.25rem 0.5rem",
          boxShadow: "5px 5px 10px 5px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
        }}
      >
        <h4>{`${label} : data ${payload[0].value}`}</h4>
      </div>
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
