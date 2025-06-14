import React from "react";
import { Button } from "../ui/button.tsx";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      style={{ backgroundImage: "url('/img/hero.jpg')" }}
      className="bg-cover bg-center font-secondary"
    >
      <section className="lg:bg-emerald-500 text-white lg:text-slate-800 bg-emerald-950/80">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 py-12 lg:py-24 text-lg">
          <div className="w-full p-8 max-w-128 mx-auto flex flex-col gap-4">
            <h1 className="text-4xl font-bold flex lg:flex-row flex-col">
              #GrowWith<span>Nature</span>
            </h1>
            <h2 className="text-2xl font-semibold text-amber-100">
              Friend of Farmer
            </h2>
            <div className="text-slate-100 lg:text-slate-800">
              <p>
                A platform dedicated to empowering farmers with the tools and
                resources they need to thrive in the modern agricultural
                landscape.
              </p>
              {/* <br />
              <p>
                Join us in our mission to support sustainable farming practices
                and promote the well-being of farmers everywhere.
              </p> */}
            </div>
            <Link to="generate-report"></Link>
            <Button className="w-fit bg-emerald-500 md:bg-slate-800 flex gap-4 items-center hover:scale-105 cursor-pointer">
              {" "}
              Generate Your Report Now <FaAngleRight />
            </Button>
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
