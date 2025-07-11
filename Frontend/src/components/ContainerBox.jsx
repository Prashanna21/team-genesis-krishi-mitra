import React from "react";

const ContainerBox = ({ children, customCSS }) => {
  return (
    <div
      className={`flex flex-col bg-emerald-500  rounded-2xl px-5 py-6  ${customCSS}`}
    >
      {children}
    </div>
  );
};

export default ContainerBox;
