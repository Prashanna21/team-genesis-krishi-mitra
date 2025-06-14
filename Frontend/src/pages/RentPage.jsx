import React, { useState } from "react";
import RCard from "../components/Rent/RCard";

const dummyTools = [
  {
    id: 1,
    name: "Tractor",
    image:
      "https://imgs.search.brave.com/_hH_RlM_LULq4TdRSqubEYfcFoNLZq02OXFGLsNo934/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90cmFj/dG9yLXBsb3dpbmct/cmljZS1maWVsZC1j/aGl0dmFuLW5lcGFs/LWFwci1hcHJpbC01/NzI4Njc2MC5qcGc",
    pricePerDay: "Rs. 5000",
    location: "Chitwan",
    description: "Heavy-duty tractor for plowing and hauling.",
  },
  {
    id: 2,
    name: "Rotavator",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdjG1bTwq_NuQAE3JJFManhoOv7vnv7LNiGQ&s",
    pricePerDay: "Rs. 2500",
    location: "Butwal",
    description: "Ideal for seedbed preparation and weed control.",
  },
  {
    id: 3,
    name: "Power Tiller",
    image:
      "https://i.ytimg.com/vi/ToIIginvSP8/maxresdefault.jpg",
    pricePerDay: "Rs. 1500",
    location: "Biratnagar",
    description: "Compact machine for small and medium fields.",
  },
  {
    id: 4,
    name: "Irrigation Pump",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpy3sC-zXWWB8QN512ELeZbsFKbnYD4w5irA&s",
    pricePerDay: "Rs. 800",
    location: "Pokhara",
    description: "Portable pump suitable for field irrigation.",
  },
];
const RentPage = () => {
  const [search, setSearch] = useState("");

  const filteredTools = dummyTools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-slate-50 min-h-screen p-4 py-8 flex flex-col gap-4">
      <div className="w-full py-8 px-8 rounded-xl bg-emerald-500 flex items-center justify-between gap-4 max-w-6xl mx-auto p-4 flex-wrap">
        <h1 className="text-white text-3xl font-bold">
          Rent <span className="text-slate-700">Tools</span>
        </h1>
        <input
          type="search"
          className="w-full sm:max-w-64 p-2 px-4 h-fit border-2 text-slate-700 bg-white rounded-xl border-white"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTools.map((tool) => (
          <RCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
};

export default RentPage;
