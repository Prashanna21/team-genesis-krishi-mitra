import React from "react";
import { useSelector } from "react-redux";
// import data from "../data/demo.json"; // Assuming this is the path to your demo data
import Title from "../components/reuseables/Title";
import SlideDown from "../components/reuseables/SlideDown";

function Report() {
  const data = useSelector((state) => state.reportData) || {};
  console.log("Report Data:", data);

  return (
    <main className="w-full p-4 min-h-screen bg-slate-200">
      <section className="w-full mx-auto max-w-6xl p-4 fle flex flex-col gap-4">
        <Title title="Generated Report" />

        <div className="w-full bg-white rounded-xl p-4 shadow-lg">
          {/* simple suggestion */}
          <SlideDown
            title={"Suggested Crop"}
            value={data?.suggestedCrop}
          ></SlideDown>

          {/* total seed required */}
          <SlideDown
            title={"Total Seed Required"}
            value={`${data?.seed_price_in_nepal_and_total_seed_needed_in_that_area?.total_seed_needed_kg?.min} - ${data?.seed_price_in_nepal_and_total_seed_needed_in_that_area?.total_seed_needed_kg?.max} kg`}
          />

          {/* total seed cost */}
          <SlideDown
            title={"Total Seed Cost"}
            value={` ${data?.seed_price_in_nepal_and_total_seed_needed_in_that_area?.estimated_seed_cost.min} -  ${data?.seed_price_in_nepal_and_total_seed_needed_in_that_area?.estimated_seed_cost.max}`}
          >
            <div className="w-full">
              {
                data?.seed_price_in_nepal_and_total_seed_needed_in_that_area
                  ?.seed_price_per_kg_avg
              }{" "}
              for estimated required seed{" "}
              {
                data?.seed_price_in_nepal_and_total_seed_needed_in_that_area
                  ?.total_seed_needed_kg?.min
              }{" "}
              -{" "}
              {
                data?.seed_price_in_nepal_and_total_seed_needed_in_that_area
                  ?.total_seed_needed_kg?.max
              }
              kg
            </div>
          </SlideDown>

          <SlideDown
            title="Fertilizer Cost"
            value={data?.fertilizer_cost?.value?.replace(
              "(approximately)",
              ".approx"
            )}
          >
            <div className="w-full">
              <b>By calculaing :</b>
              <br />
              {Object.keys(data?.fertilizer_cost?.calculation)?.map(
                (key, index) => (
                  <p key={index}>
                    Price of {key} : {data?.fertilizer_cost?.calculation[key]}
                  </p>
                )
              )}
            </div>
          </SlideDown>

          {/* total seed cost */}
          <SlideDown
            title={"Estimeted Total Cost"}
            value={data?.total_cost?.value}
          >
            <div className="w-full">
              <b>By calculaing : </b> <br />
              {Object.keys(data?.total_cost?.calculation)?.map((key, index) => (
                <p key={index}>
                  Estimeted {key} cost : {data?.total_cost?.calculation[key]}
                </p>
              ))}
            </div>
          </SlideDown>

          <SlideDown
            title={"Yeild Estimation"}
            value={data?.timeRequiredForCropToGrow}
          />

          <SlideDown title={"Average Produiction"} value={"Approx"}>
            <div className="w-full">
              <p>
                {data?.total_avg_production_with_that_number_of_seed?.value}
              </p>
            </div>
          </SlideDown>

          {/* roi */}
          <SlideDown
            title={"Estimated ROI"}
            value={`${data?.roi_total_profit_by_reducing_revenue_with_total_cost?.roi_min} - ${data?.roi_total_profit_by_reducing_revenue_with_total_cost?.roi_max} `}
          >
            <div className="w-full">
              <b>Min ROI : </b>
              {Object.keys(
                data?.roi_total_profit_by_reducing_revenue_with_total_cost
                  ?.estimated_revenue_min
              )?.map((key, index) => (
                <p key={index} className="capitalize">
                  Minimum {key?.replaceAll("_", " ")} :{" "}
                  {
                    data?.roi_total_profit_by_reducing_revenue_with_total_cost
                      ?.estimated_revenue_min[key]
                  }
                </p>
              ))}{" "}
              <b>Max ROI : </b>
              {Object.keys(
                data?.roi_total_profit_by_reducing_revenue_with_total_cost
                  ?.estimated_revenue_max
              )?.map((key, index) => (
                <p key={index} className="capitalize">
                  Maximum {key?.replaceAll("_", " ")} :{" "}
                  {
                    data?.roi_total_profit_by_reducing_revenue_with_total_cost
                      ?.estimated_revenue_max[key]
                  }
                </p>
              ))}
            </div>
          </SlideDown>
          {/* total */}
          <SlideDown
            title={"Net Profit/Loss"}
            value={`${data?.roi_total_profit_by_reducing_revenue_with_total_cost?.net_profit_loss_min} - ${data?.roi_total_profit_by_reducing_revenue_with_total_cost?.net_profit_loss_max}`}
          ></SlideDown>

          {/* advices */}
          <SlideDown title={"Advice"} value={"(Read)"}>
            <ul className="w-full flex flex-col gap-2">
              {data?.advices?.map((item, index) => (
                <li key={index}>
                  <b>
                    {index + 1}
                    {")"}
                  </b>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </SlideDown>
        </div>
      </section>
    </main>
  );
}

export default Report;
