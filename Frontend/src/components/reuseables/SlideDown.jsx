import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const SlideDown = ({ title, value, children }) => {
  const [activated, setActivated] = React.useState(false);

  return (
    <div
      className={`w-full ${
        activated ? "h-auto" : "h-14"
      } flex flex-col border-b-2 border-slate-400 overflow-hidden`}
    >
      <div
        className="w-full cursor-pointer transition-all font-semibold  flex h-14 p-4 items-center justify-between hover:bg-gray-100"
        onClick={() => setActivated(!activated)}
      >
        <h3 className="w-fit">{title}</h3>
        <div className="w-fit flex items-center gap-4">
          <span className="capitalize hidden sm:block">{value}</span>
          <button>{activated ? <FaAngleUp /> : <FaAngleDown />}</button>
        </div>
      </div>
      <div
        className={`w-full ${
          activated && children && "sm:border-t border-slate-300"
        }`}
      >
        <p className="text-emerald-500 border-slate-300 sm:hidden w-full p-4 border-t capitalize font-semibold">
          {value}
        </p>
        {children && activated && (
          <div className="w-full p-4 text-gray-700">{children}</div>
        )}
      </div>
    </div>
  );
};

export default SlideDown;
