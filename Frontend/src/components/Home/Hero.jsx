import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button.tsx";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section
      style={{ backgroundImage: "url('/img/hero.jpg')" }}
      className="bg-cover bg-center font-secondary"
    >
      <section className="lg:bg-emerald-500 text-white lg:text-slate-800 bg-emerald-950/80">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 py-12 lg:py-24 text-lg">
          <div className="w-full p-8 max-w-128 mx-auto flex flex-col gap-4">
            <h1 className="text-4xl font-bold flex lg:flex-row flex-col">
              {t("growWith.hashtag")}
              <span>{t("growWith.title")}</span>
            </h1>
            <h2 className="text-2xl font-semibold text-amber-100">
              {t("growWith.subtitle")}
            </h2>
            <div className="text-slate-100 lg:text-slate-800">
              <p>{t("growWith.description")}</p>
            </div>
            <Link to="/farmer/generate-report">
              <Button className="w-fit bg-emerald-500 md:bg-slate-800 flex gap-4 items-center hover:scale-105 cursor-pointer">
                {t("growWith.cta")} <FaAngleRight />
              </Button>
            </Link>
          </div>

          <div className="w-full hidden lg:flex px-8 max-w-128 mx-auto flex-col gap-4">
            <img
              src="/img/hero.jpg"
              alt="Hero Image"
              className="w-full h-82 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Hero;
