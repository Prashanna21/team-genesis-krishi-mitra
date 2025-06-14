import React from "react";
import { IoIosPin } from "react-icons/io";

const RCard = ({ tool }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-amber-50 flex overflow-hidden h-60">
      {/* Left: Details */}
      <div className="flex flex-col justify-center gap-2 w-2/3 px-6 py-4">
        <h2 className="text-xl font-bold text-emerald-600">{tool.name}</h2>
        <p className="text-gray-600">Vehicle: {tool.name}</p>
        <p className="text-gray-600">Rent: {tool.pricePerDay}</p>
        <p className="text-gray-500 flex items-center gap-1">
          <IoIosPin className="text-amber-500" /> {tool.location}
        </p>
      </div>

      {/* Right: Full Image in Card */}
      <div className="w-2/3 h-full">
        <img
          src={tool.image}
          alt="vehicle"
          className="w-full h-full object-cover bg-amber-200"
        />
      </div>
    </div>
  );
};

export default RCard;
