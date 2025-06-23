import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../app/infoSlice.js";
import MarketCard from "../components/market/MarketCard.jsx";

const MarketPlace = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${import.meta.env.VITE_NODE_BACKEND_URL}/farmer/market`)
        .then((res) => {
          console.log(res);
          setDatas(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const [search, setSearch] = useState("");

  return (
    <section className="w-full flex flex-col gap-4 py-8 px-4 justify-between bg-slate-50">
      <div className="w-full py-8 px-8 rounded-xl bg-emerald-500 flex items-center justify-between gap-4 max-w-6xl mx-auto p-4 flex-wrap">
        <h1 className="text-white text-3xl  font-bold">
          Fresh <span className="text-slate-700">Products</span>
        </h1>

        <input
          type="search"
          className="w-full sm:max-w-64 p-2 px-4  h-fit border-2 text-slate-700 bg-white rounded-xl border-white"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full grid grid-cols-1 pt-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto gap-8">
        {Array.isArray(datas) &&
          datas?.map((item, index) => <MarketCard key={index} item={item} />)}
      </div>
    </section>
  );
};

export default MarketPlace;
