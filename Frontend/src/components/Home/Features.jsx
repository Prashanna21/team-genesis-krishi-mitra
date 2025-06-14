import React from "react";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t, i18n } = useTranslation();
console.log(i18n.language);
console.log(t("features.heading"));
  const data = [
    {
      key: "report",
      icon: "/img/features/report.png",
    },
    {
      key: "marketplace",
      icon: "/img/features/market.png",
    },
    {
      key: "ai",
      icon: "/img/features/AI.png",
    },
    {
      key: "tools",
      icon: "/img/features/tools.png",
    },
    {
      key: "consultation",
      icon: "/img/features/consultancy.png",
    },
  ];

  return (
    <section className="w-full p-4">
      <div className="w-full max-w-6xl flex flex-col gap-8 p-4 mx-auto">
        <h2 className="w-full text-4xl font-bold text-slate-800">
          {t("features.heading")}
        </h2>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {data.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col bg-green-50 transition-all 
              cursor-pointer text-slate-800 hover:text-emerald-600 duration-300 hover:scale-105 hover:bg-amber-100 rounded-xl p-6 shadow-lg"
            >
              <img
                src={feature.icon}
                alt={t(`features.${feature.key}.title`)}
                className="w-16 h-16 object-contain"
              />
              <h3 className="text-xl font-semibold mb-2">
                {t(`features.${feature.key}.title`)}
              </h3>
              <p className="text-slate-600">
                {t(`features.${feature.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;