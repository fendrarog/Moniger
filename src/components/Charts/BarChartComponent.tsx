import React from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 2000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 1500,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 3890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const BarChartComponent: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart width={150} height={40} data={data} barCategoryGap="5%">
        <Bar dataKey="uv" fill="#e5e7eb" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
