import { Cell, Pie, PieChart, Sector } from "recharts";
import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

export const SparklineAreaData = [
  { x: 1, yval: 12 },
  { x: 2, yval: 17 },
  { x: 3, yval: 10 },
  { x: 4, yval: 11 },
  { x: 5, yval: 8 },
];

const COLORS = ["#A855F7", "#14B8A6", "#FCD34D", "#E11D48", "#22D3EE"];

const renderActiveShape = (props: any) => {
  let { cx, cy, outerRadius, fill, stroke, payload } = props;
  console.log({ ...props });
  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={stroke}
        style={{ fontWeight: "bold" }}
      >
        ${payload.yval}K
      </text>
      <Sector {...props} fill={stroke} outerRadius={outerRadius + 5} />
    </g>
  );
};

const PieChartComponent: React.FC = () => {
  const { currentColor } = useStateContext();
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const onPieEnter = (_: undefined, index: number) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={200} height={200}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={SparklineAreaData}
        cx={100}
        cy={100}
        innerRadius={40}
        outerRadius={80}
        fill={currentColor}
        dataKey="yval"
        onMouseEnter={onPieEnter}
      >
        {SparklineAreaData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            stroke={currentColor}
            cursor="pointer"
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChartComponent;
