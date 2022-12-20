import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const ModalBlock: React.FC = () => {
  const { activeMenu, screenSize, themeSettings } = useStateContext();

  if ((activeMenu && screenSize! < 1280) || themeSettings) {
    return (
      <div className="modal-block bg-half-transparent w-screen fixed top-0 right-0 bottom-0 left-0 z-50"></div>
    );
  }

  return null;
};

export default ModalBlock;
