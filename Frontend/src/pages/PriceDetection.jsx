import React, { useState } from "react";
import str from "../data/structure.json";
import axios from "axios";

const PriceDetection = () => {
  const [data, setData] = useState({
    Commodity: "",
    Date: new Date().toISOString().split("T")[0],
    Unit: "kg",
  });

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_NODE_BACKEND_URL}/report/predict-price`,
        data
      );
      console.log("Response from server:", response);

      setOutput(
        `Npr ${parseInt(response.data.price).toLocaleString()}` ||
          "No output received"
      );
    } catch (error) {
      console.log("Error:", error.message);
      setOutput("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="w-full min-h-[calc(100vh-4.5rem)] bg-cover bg-center flex col relative justify-center items-center"
      style={{ backgroundImage: `url("/potato.jpg")` }}
    >
      <div className="w-full absolute z-0 bg-emerald-950/70 top-0 bottom-0"></div>

      <div className="w-full p-4 flex justify-center items-center z-10">
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 bg-white py-4 rounded-xl shadow">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4 p-4 px-6 border-r-2 border-slate-600"
          >
            <h1 className="text-2xl font-bold text-emerald-600 mb-4">
              Predict Price
            </h1>

            <div className="w-full">
              <label className="block font-medium mb-1">Crops</label>
              <select
                type="text"
                required
                className="w-full p-2 rounded border-2"
                value={data?.Commodity}
                onChange={(e) =>
                  setData({ ...data, Commodity: e.target.value })
                }
              >
                <option value="">Select a crop</option>
                {str?.Commodity?.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block font-medium mb-1">
                Unit of {data?.Commodity || "crop"}
              </label>
              <select
                type="text"
                required
                className="w-full p-2 rounded border-2"
                value={data?.Unit}
                onChange={(e) => setData({ ...data, Unit: e.target.value })}
              >
                {str?.Unit?.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <label className="block font-medium mb-1">Predict For</label>
              <input
                type="date"
                required
                className="w-full p-2 rounded border-2"
                value={data?.Date}
                onChange={(e) => setData({ ...data, Date: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700 transition-colors duration-200"
            >
              Predict Price
            </button>
          </form>

          <div className="p-4 px-6 flex flex-col gap-4 justify-between items-start">
            <b className="">output : </b>
            <div className="w-full h-full flex text-xl rounded-xl bg-slate-50 border-2 items-center justify-center">
              {loading ? "Loading..." : output ? output : "No output yet!"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceDetection;
