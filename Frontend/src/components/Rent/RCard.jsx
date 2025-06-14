import React from "react";
import { IoIosPin } from "react-icons/io";

const RCard = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-amber-50 flex overflow-hidden h-60">
      {/* Left: Details */}
      <div className="flex flex-col justify-center gap-2 w-2/3 px-6 py-4">
        <h2 className="text-xl font-bold text-emerald-600">John Doe</h2>
        <p className="text-gray-600">Vehicle: Tractor</p>
        <p className="text-gray-600">Rent: Rs. 500/hr</p>
        <p className="text-gray-500 flex items-center gap-1">
          <IoIosPin className="text-amber-500" /> Chitwan, Nepal
        </p>
      </div>

      {/* Right: Full Image in Card */}
      <div className="w-2/3 h-full">
        <img
          src="https://www.agriculture.com/thmb/UZd-5DTI8MRZZX1FMtaUYSFAZ6s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/JohnDeere6mtractor2-caab0db2613b4178a2616b944bc8e05f.jpg"
          alt="vehicle"
          className="w-full h-full object-cover bg-amber-200"
        />
      </div>
    </div>
  );
};

export default RCard;
