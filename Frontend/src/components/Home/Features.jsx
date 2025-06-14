import React from "react";

const data = [
  {
    title: "Report Generation",
    description:
      "Predic future profit on crops with our advanced report generation.",
    icon: "/img/features/report.png",
  },
  {
    title: "MarketPlace",
    description:
      "Sell your products on our marketplace to reach a wider audience.",
    icon: "/img/features/market.png",
  },
  {
    title: "AI Plant Disease Detection",
    description:
      "Upload the picture of your plant and get instant disease detection.",
    icon: "/img/features/AI.png",
  },
  {
    title: "Renting Tools",
    description:
      "Easily rent agricultural tools and equipment from local providers.",
    icon: "/img/features/tools.png",
  },
  {
    title: "Expert Consultation",
    description: "Connect with agricultural experts for personalized advice.",
    icon: "/img/features/consultancy.png",
  },
];

const Features = () => {
  return (
    <section className="w-full p-4">
      <div className="w-full max-w-6xl flex flex-col gap-8 p-4 mx-auto">
        <h2 className="w-full text-4xl font-bold text-slate-800">
          Our Features
        </h2>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {data?.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col bg-green-50 transition-all 
              cursor-pointer text-slate-800 hover:text-emerald-600 duration-300 hover:scale-105 hover:bg-amber-100 rounded-xl p-6 shadow-lg"
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-16 h-16 object-contain"
              />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
