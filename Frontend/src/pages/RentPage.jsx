import React, { useState } from "react";
import RCard from "../components/Rent/RCard";

const RentPage = () => {
  const [search, setSearch] = useState("");
  return (
    <section className="bg-slate-50 min-h-screen p-4 py-8 flex flex-col gap-4">
      <div className="w-full py-8 px-8 rounded-xl bg-emerald-500 flex items-center justify-between gap-4 max-w-6xl mx-auto p-4 flex-wrap">
        <h1 className="text-white text-3xl  font-bold">
          Rent <span className="text-slate-700">Tools</span>
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
        <RCard />
      </div>
    </section>
  );
};

export default RentPage;
