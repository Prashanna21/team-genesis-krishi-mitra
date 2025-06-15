import React, { useState } from "react";

const PriceDetection = () => {
  const [data, setData] = useState({
    commodity: "",
    date: new Date().toISOString,
  });

  return (
    <section
      className="w-full min-h-[calc(100vh-4.5rem)] bg-cover bg-center flex col relative justify-center items-center"
      style={{ backgroundImage: `url("/potato.jpg")` }}
    >
      <div className="w-full bg-emerald-950/80 absolute z-0 top-0 bottom-0"></div>

      <div className="w-full p-4 flex justify-center items-center z-10"></div>
    </section>
  );
};

export default PriceDetection;
