import React from "react";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";

const HomePage = () => {
  return (
    <main className="w-full h-fit">
      <Hero />
      <Features dashboard={false} />
    </main>
  );
};

export default HomePage;
