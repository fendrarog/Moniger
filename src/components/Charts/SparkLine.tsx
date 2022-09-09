import React from "react";

interface SparkLineProps {
  currentColor: string;
  id: string;
  type: string;
  height: string;
  width: string;
  data: {
    x: number;
    yval: number;
  }[];
  color: string;
}

const SparkLine: React.FC<SparkLineProps> = ({
  currentColor,
  id,
  type,
  height,
  width,
  data,
  color,
}) => {
  return <div>SparkLine</div>;
};

export default SparkLine;
