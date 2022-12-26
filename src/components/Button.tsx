import React from "react";

interface ButtonProps {
  icon?: JSX.Element;
  color?: string;
  bgHoverColor?: string;
  bgColor?: string;
  text?: string;
  borderRadius?: string;
  size?: string;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  color,
  bgHoverColor,
  bgColor,
  text,
  borderRadius,
  size,
  width,
}) => {
  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} dark:hover:bg-[#7b808c] dark:text-gray-200`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
