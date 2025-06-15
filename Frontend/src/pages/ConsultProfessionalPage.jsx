import React from "react";
import { useState } from "react";
import data from "../data/consult.json";
import { MdOutlineEventAvailable } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";

function ConsultProfessionalPage() {
  const [search, setSearch] = useState("");
  return (
    <section className="bg-slate-50 min-h-screen p-4 py-8 flex flex-col gap-4">
      <div className="w-full py-8 px-8 rounded-xl bg-emerald-500 flex items-center justify-between gap-4 max-w-6xl mx-auto p-4 flex-wrap">
        <h1 className="text-white text-3xl  font-bold">
          Consult <span className="text-slate-700">Professional</span>
        </h1>

        <input
          type="search"
          className="w-full sm:max-w-64 p-2 px-4  h-fit border-2 text-slate-700 bg-white rounded-xl border-white"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {data.map((card) => (
          <div
            key={card._id}
            className="cursor-pointer w-full bg-white rounded-2xl shadow-md border border-amber-50 flex overflow-hidden h-60"
          >
            {/* Left: Details */}
            <div className="flex flex-col justify-center gap-2 w-2/3 px-6 py-4">
              <h2 className="text-xl font-bold text-emerald-600">
                {card.name}
              </h2>
              <p className="text-gray-600">
                Qualification: {card.qualification}
              </p>
              <p className="text-gray-600">Speciality: {card.speciality}</p>
              <p className="text-gray-500 flex items-start gap-0.5">
                <MdOutlineEventAvailable className="text-amber-500 mt-0.5 w-6 h-6" />
                Availability: {card.availability}
              </p>
            </div>

            {/* Right: Full Image in Card */}
            <div className="w-2/3 h-full">
              <img
                src={card.image}
                alt=""
                className="w-full h-full object-cover bg-amber-200"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ConsultProfessionalPage;
