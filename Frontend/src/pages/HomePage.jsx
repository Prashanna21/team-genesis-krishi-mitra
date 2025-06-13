import React from "react";
import ContainerBox from "../components/ContainerBox.jsx";
import { Button } from "../components/ui/button.tsx";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaCamera, FaStore, FaCloudSun } from "react-icons/fa";
import { motion } from "framer-motion";

function HomePage() {
  const features = [
    {
      icon: <FaCamera className="text-3xl text-purple-600" />,
      title: "AI Camera",
      description: "Detects Plant Disease, Name, Soil Moisture",
    },
    {
      icon: <FaStore className="text-3xl text-green-600" />,
      title: "MarketPlace",
      description:
        "Consumers can directly contact farmers. And farmers can sell their own products.",
    },
    {
      icon: <FaCloudSun className="text-3xl text-pink-500" />,
      title: "Weather",
      description: "Farmers will know what will be the weather today.",
    },
  ];
  return (
    <>
      <div className="text-2xl min-h-[calc(100%-100px)]  font-bold flex flex-col justify-center items-center px-5 gap-7 ">
        <ContainerBox customCSS="text-center gap-7 ">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-bold items-center text-4xl flex flex-col"
          >
            <span>#GrowWith</span>
            <span>Nature</span>
          </motion.div>

          <div className="font-semibold font-primary">Friend of Farmer</div>
          <div className="font-light font-primary text-sm">
            We are transforming agriculture by directly connecting farmers with
            markets, ensuring they get fair prices and better opportunities. By
            removing middlemen and streamlining the supply chain.
          </div>
          <div className="text-center align-middle flex flex-row font-medium text-2xl justify-center ">
            <div className="flex flex-col">
              <div>50+</div>
              <div>Farms</div>
            </div>
            <div className="h-20 text-6xl font-extralight">|</div>
            <div
              className="flex flex-col
            "
            >
              <div>100+</div>
              <div>Farmers</div>
            </div>
          </div>
          <div className="align-middle items-center justify-center">
            <Button className=" w-52 rounded-2xl ">
              Connect to Farmers <HiArrowLongRight />
            </Button>
          </div>
          <span className="font-light text-sm underline">Learn More</span>
        </ContainerBox>
        {/* //our features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl text-center font-semibold text-green-800 mb-8 border-b pb-2">
            Our Features
          </h2>
          <div className="flex flex-col gap-6 max-w-xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 border-b pb-4 last:border-none"
              >
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-green-700">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-700">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default HomePage;
