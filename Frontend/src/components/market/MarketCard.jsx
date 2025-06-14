import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { IoIosPin } from "react-icons/io";

const MarketCard = ({ item }) => {
  const { image, name, price, _id } = item;
  return (
    <NavLink
      to={`/marketplace/${_id}`}
      className="w-full bg-slate-50 rounded-2xl p-0 shadow-lg transition-all cursor-pointer hover:scale-105 hover:bg-white duration-300"
    >
      <div className="w-full h-64 relative">
        <img
          src={image}
          alt="Market Item"
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </div>{" "}
      <div className="w-full flex flex-col gap-2 p-4">
        <h3 className="w-full text-md whitespace-nowrap turncate overflow-hidden">
          {name}
        </h3>{" "}
        <div className="w-full flex gap-2 flex-col">
          <p className="w-full flex text-sm gap-1 items-center">
            <IoIosPin className="text-slate-500 text-lg " />
            <span className="text-sm text-slate-600">{item?.location}</span>
          </p>
          <p className="w-full flex text-sm gap-2 items-center text-emerald-500">
            <span className=" text-sm font-semibold ">Stock : </span>
            <span className="text-sm ">{item?.stock}</span>
          </p>
        </div>
        <button className="w-full font-bold text-emerald-500 text-xl px-0 flex justify-between items-center">
          <span>NPR {price}</span>
          <FaArrowRight />
        </button>
      </div>
    </NavLink>
  );
};

export default MarketCard;
