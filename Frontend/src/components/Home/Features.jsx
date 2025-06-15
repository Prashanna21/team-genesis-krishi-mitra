import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Features = ({ dashboard = false }) => {
  const { t } = useTranslation();

  const baseData = [
    {
      key: "report",
      icon: "/img/features/report.png",
      route: "/farmer/generate-report",
    }, {
      key: "price",
      icon: "/img/features/tag.png",
      route: "/farmer/price-detection", // i waant some descripton like ai powered future price prediction
    },
    {
      key: "marketplace",
      icon: "/img/features/market.png",
      route: dashboard ? "/farmer/marketplace" : "/marketplace",
    },
    {
      key: "ai",
      icon: "/img/features/AI.png",
      route: "/farmer/disease-detection",
    },
    {
      key: "tools",
      icon: "/img/features/tools.png",
      route: "/rent-tools",
    },
    {
      key: "consultation",
      icon: "/img/features/consultancy.png",
      route: "/farmer/consultation",
    },
  ];

  const provideRentTool = {
    key: "tools",
    icon: "/img/features/tools.png",
    route: "/farmer/rent-tools",
    isProvide: true,
  };

  const combinedData = baseData

  return (
    <section className="w-full p-4">
      <div className="w-full max-w-6xl flex flex-col gap-8 p-4 mx-auto">
        <h2 className="w-full text-4xl font-bold text-slate-800">
          {t(`features.${dashboard ? "dashboardHeading" : "heading"}`)}
        </h2>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {combinedData.map(({ key, icon, route, isProvide }, index) => (
            <Link to={route} key={index}>
              <div
                className="flex flex-col bg-green-50 transition-all 
                cursor-pointer text-slate-800 hover:text-emerald-600 duration-300 hover:scale-105 hover:bg-amber-100 rounded-xl p-6 shadow-lg"
              >
                <img
                  src={icon}
                  alt={t(`features.${key}.${isProvide ? "provideTitle" : "title"}`)}
                  className="w-16 h-16 object-contain"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {t(`features.${key}.${isProvide ? "provideTitle" : "title"}`)}
                </h3>
                <p className="text-slate-600">
                  {t(`features.${key}.${isProvide ? "provideDescription" : "description"}`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;