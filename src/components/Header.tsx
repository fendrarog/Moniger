import React from "react";

interface HeaderProps {
  category: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ category, title }) => {
  return (
    <div className="mb-7 mt-16 md:mb-10 md:mt-0">
      <p className="text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </p>
    </div>
  );
};

export default Header;
