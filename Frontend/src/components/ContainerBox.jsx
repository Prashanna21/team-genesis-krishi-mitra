import React from "react";

const ContainerBox = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col bg-secondary-lightgreen h-1/3 w-[100%] rounded-2xl px-5 py-6  {}`}
    >
      {" "}
      {children}
    </div>
  );
};

export default ContainerBox;
