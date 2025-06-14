import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Title = ({ title }) => {
  const nav = useNavigate();
  return (
    <div className="w-full flex rounded-full bg-white shadow items-center gap-4 p-4 border-slate-500">
      <button
        onClick={() => nav(-1)}
        className="w-fit p-1 px-4 bg-slate-800 cursor-pointer rounded-xl trabsition-all duration-300 hover:bg-slate-900 text-white flex gap-4 items-center"
      >
        <FaAngleLeft />
        <span>Go back</span>
      </button>

      <h1 className="text-xl text-slate-700 font-bold">{title}</h1>
    </div>
  );
};

export default Title;
