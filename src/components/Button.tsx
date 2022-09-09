import React from "react";

interface ButtonProps {
  color: string;
  bgColor: string;
  text: string;
  borderRadius: string;
  size: string;
}

const Button: React.FC<ButtonProps> = ({
  color,
  bgColor,
  text,
  borderRadius,
  size,
}) => {
  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} p-3 hover:drop-shadow-xl`}
    >
      {text}
    </button>
  );
};

export default Button;
