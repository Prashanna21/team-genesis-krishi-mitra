import React from "react";

import { Link } from "react-router-dom";

const Features = ({ dashboard = false }) => {
  const data = [
    {
      title: "Report Generation",
      description:
        "Predic future profit on crops with our advanced report generation.",
      icon: "/img/features/report.png",
      route: "/farmer/generate-report",
    },
    {
      title: "MarketPlace",
      description:
        "Sell your products on our marketplace to reach a wider audience.",
      icon: "/img/features/market.png",
      route: `${dashboard ? "/farmer/marketplace" : "/marketplace"}`,
    },
    {
      title: "AI Plant Disease Detection",
      description:
        "Upload the picture of your plant and get instant disease detection.",
      icon: "/img/features/AI.png",
      route: "/farmer/disease-detection",
    },
    {
      title: "Rent Tools",
      description:
        "Easily rent agricultural tools and equipment from local providers.",
      icon: "/img/features/tools.png",
      route: "/rent-tools",
    },
    {
      title: "Expert Consultation",
      description: "Connect with agricultural experts for personalized advice.",
      icon: "/img/features/consultancy.png",
      route: "/farmer/consultation",
    },
  ];

  const provide_rent = {
    title: "Provide Tools for Rent",
    description:
      "Easily rent agricultural tools and equipment to local farmers.",
    icon: "/img/features/tools.png",
    route: "/farmer/rent-tools",
  };
  return (
    <>
      <section className="w-full p-4">
        <div className="w-full max-w-6xl flex flex-col gap-8 p-4 mx-auto">
          <h2 className="w-full text-4xl font-bold text-slate-800">
            {dashboard ? "Farmer Portal" : "Features"}
          </h2>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...data, ...(dashboard ? [provide_rent] : [])]?.map(
              ({ title, icon, route, description }, index) => (
                <Link to={route} key={index}>
                  <div
                    key={index}
                    className="flex flex-col bg-green-50 transition-all 
              cursor-pointer text-slate-800 hover:text-emerald-600 duration-300 hover:scale-105 hover:bg-amber-100 rounded-xl p-6 shadow-lg"
                  >
                    <img
                      src={icon}
                      alt={title}
                      className="w-16 h-16 object-contain"
                    />
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-slate-600">{description}</p>
                  </div>
                </Link>
              )
            )}
          </div>

        </div>
      </section>
    </>
  );
};

export default Features;