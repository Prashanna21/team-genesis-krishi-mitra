import React, { useState } from "react";
import Title from "../components/reuseables/Title";
import CustomImage from "../components/reuseables/CustomImage";

const MarketFarmer = () => {
  const [blob, setBlob] = useState("");
  const [data, setData] = useState({
    image: null,
    location: "",
    name: "",
    stock: "",
    price: 0,
  });

  const handleTxt = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFile = (file) => {
    const blobData = URL.createObjectURL(file);
    setData((prev) => ({
      ...prev,
      image: file,
    }));
    setBlob(blobData);
  };

  return (
    <main className="w-full bg-slate-200 flex flex-col gap-4 min-h-[calc(100vh-5rem)] p-4">
      <div className="w-full max-w-6xl flex flex-col gap-4 mx-auto">
        <Title title="Add crops for sale" />
        <form
          action=""
          className="w-full grid bg-white rounded-xl overflow-hidden lg:grid-cols-2 gap-4 grid-cols-1"
        >
          <CustomImage
            source={blob || "/DetectionPageImg.jpg"}
            change={handleFile}
          />

          <div className="w-full flex flex-col gap-6 p-4 ">
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full border-2 rounded-lg border-slate-700 px-4 py-2 p- text-lg bg-white"
                value={data.name}
                onChange={handleTxt}
                placeholder="Enter product name"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="w-full border-2 rounded-lg border-slate-700 px-4 py-2 p- text-lg bg-white"
                value={data.location}
                onChange={handleTxt}
                placeholder="Enter Location"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                Stock
              </label>
              <input
                type="text"
                name="stock"
                id="stock"
                className="w-full border-2 rounded-lg border-slate-700 px-4 py-2 p- text-lg bg-white"
                value={data.stock}
                onChange={handleTxt}
                placeholder="Available X goods"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold">
                Price of goods
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="w-full border-2 rounded-lg border-slate-700 px-4 py-2 p- text-lg bg-white"
                value={data.price}
                onChange={handleTxt}
                placeholder="Enter product price"
              />
            </div>
            <button className="w-1/2 p-2 px-8 bg-slate-700 transition-all duration-300 text-white hover:bg-slate-800 rounded-xl ">
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default MarketFarmer;
