import { gemini } from "../utility/geminiUse.js";
import axios from "axios";

const generateReport = async (req, res) => {
  const { date, season, area, crop, location } = req.body;
  const response = await gemini(`
    You are an expert agricultural consultant specializing in crop economics and farm management in Nepal. **You are processing the provided farm data for potato cultivation to generate a comprehensive report** in a specific JSON format, including detailed calculations and relevant agricultural advice.

**Input Data (JSON):**
json
{
  "id": 1749834000415,
  "date": "2025-06-13",
  "season": "Spring",
  "area": 2342,
  "crop": "Potato",
  "location": [ 27.6713907, 85.3413926 ],
  "futurePrice": [20, 30, 27],
  "soilCondition": {
    "ph": "7.69",
    "organic_matter": "1.67 %",
    "total_nitrogen": "0.08 %",
    "potassium": "198.02 kg/ha",
    "p2o5": "38.9 kg/ha",
    "boron": "0.14 ppm",
    "zinc": "0.42 ppm",
    "sand": "29.96 %",
    "clay": "16.54 %",
    "slit": "55.51 %",
    "parentsoil": "Fluvial non calcareous",
    "province": "Sudurpaschim",
    "district": "Kailali",
    "palika": "Kailari Gaunpalika"
  }
}

output
**Output Data (JSON):**
{
  "estimated_labour_cost": {
    "value": "NPR [calculated_value] (approximately)",
    "calculation": {
      "assumptions": [
        "Typical labor requirement for potato cultivation in Nepal: ~65,000 - 70,000 NPR/hectare for manual operations (including land prep, planting, weeding, harvesting).",
        "Using an average of NPR 66,500/hectare."
      ],
      "steps": [
        "Convert area from sq m to hectares (2342 sq m / 10,000 = 0.2342 ha).",
        "Estimated labour cost = 0.2342 hectares * NPR 66,500/hectare."
      ],
      "final_calculation": "0.2342 * 66500"
    }
  },
  "fertilizer_cost": {
    "value": "NPR [calculated_value] (approximately)",
    "calculation": {
      "assumptions": [
        "Standard NPK recommendation for potato in Nepal (Terai/Mid-hills): N: 100 kg/ha, P2O5: 80 kg/ha, K2O: 60 kg/ha.",
        "Fertilizer composition: Urea (46% N), DAP (18% N, 46% P2O5), MOP (60% K2O).",
        "Approximate average prices: Urea ~NPR 40/kg, DAP ~NPR 100/kg, MOP ~NPR 70/kg."
      ],
      "steps": [
        "Calculate required DAP for P2O5: 80 kg P2O5 / 0.46 = ~173.91 kg/ha DAP.",
        "N supplied by DAP: 173.91 kg DAP * 0.18 = ~31.30 kg N/ha.",
        "Remaining N needed: 100 kg N - 31.30 kg N = ~68.70 kg N/ha.",
        "Required Urea for remaining N: 68.70 kg N / 0.46 = ~149.35 kg/ha Urea.",
        "Required MOP for K2O: 60 kg K2O / 0.60 = 100 kg/ha MOP.",
        "Total cost per hectare = (149.35 kg Urea * NPR 40/kg) + (173.91 kg DAP * NPR 100/kg) + (100 kg MOP * NPR 70/kg).",
        "Cost for 0.2342 hectares = 0.2342 * Cost per hectare."
      ],
      "final_calculation": "0.2342 * ( ( (100 - ((80/0.46)*0.18)) / 0.46 ) * 40 + (80/0.46) * 100 + 100 * 70)"
    }
  },
  "seed_price_in_nepal_and_total_seed_needed_in_that_area": {
    "seed_price_per_kg_avg": "NPR 35.00 - 85.00 (depending on variety and quality)",
    "total_seed_needed_kg": {
      "value": "[calculated_value] kg (assuming 2.5 tons/hectare seed rate)",
      "calculation": {
        "assumptions": ["Typical potato seed rate in Nepal: 2.0 - 3.0 tons (2000 - 3000 kg) per hectare. Using an average of 2.5 tons/hectare (2500 kg/hectare)."],
        "steps": [
          "Area in hectares = 0.2342 hectares.",
          "Total seed needed = 0.2342 hectares * 2500 kg/hectare."
        ],
        "final_value": "0.2342 * 2500"
      }
    },
    "estimated_seed_cost": {
      "value": "NPR [calculated_value] (approximately)",
      "calculation": {
        "assumptions": ["Using an average seed price of NPR 50/kg."],
        "steps": ["Estimated Seed Cost = [Calculated total_seed_needed_kg] * NPR 50/kg."],
        "final_calculation": "[Calculated total_seed_needed_kg] * 50"
      }
    }
  },
  "total_cost": {
    "value": "NPR [calculated_value] (approximately)",
    "calculation": {
      "steps": [
        "Sum of direct costs = Estimated Labour Cost + Fertilizer Cost + Estimated Seed Cost.",
        "Miscellaneous Costs = 20% of (Sum of direct costs) (for irrigation, pesticides, tools, land preparation, etc.).",
        "Total Cost = Sum of direct costs + Miscellaneous Costs."
      ],
      "final_value": "(Estimated Labour Cost + Fertilizer Cost + Estimated Seed Cost) * 1.20"
    }
  },
  "advices": [
    "**Soil pH Adjustment:** The current soil pH of 7.69 is higher than the ideal range for potatoes (5.2-6.4). It is recommended to amend the soil to lower the pH, potentially using organic matter like compost, elemental sulfur, or by incorporating acidifying fertilizers (e.g., Ammonium Sulfate).",
    "**Nutrient Supplementation:** Given the low organic matter (1.67%) and total nitrogen (0.08%), significant supplementation of organic manure (FYM/Compost at 20-30 tons/ha) and nitrogenous fertilizers (Urea) is crucial. Potassium levels (198.02 kg/ha) are decent, but P2O5 (38.9 kg/ha) is on the lower side; DAP would be beneficial. Also consider micronutrient fertilizers for Boron (0.14 ppm) and Zinc (0.42 ppm) levels.",
    "**Soil Texture Management:** The soil is predominantly silt (55.51%). Ensure good drainage to prevent waterlogging. Raised beds could be beneficial, especially during monsoon.",
    "**Disease Management:** Implement integrated disease management strategies against Late blight and bacterial wilt, including resistant varieties, proper seed treatment, and timely fungicide application.",
    "**Weed Control:** Vital, especially in early growth. Consider mulching or timely weeding to reduce competition.",
    "**Irrigation Management:** Consistent moisture is crucial during tuber formation. Avoid over-irrigation or water stress.",
    "**Marketing Strategy:** Consider pre-harvest contracts or direct sales to local markets/retailers to secure better prices and reduce post-harvest losses. Look into local cooperatives for collective marketing."
  ],
  "challenges_of_this_crop": [
    "**Poor availability of quality seed potato:** A major limiting factor, often leading to lower yields and disease susceptibility.",
    "**Lack of seed potato storage:** Inadequate cold storage facilities lead to high post-harvest losses.",
    "**Disease and pest infestation:** Late blight, bacterial wilt, potato virus Y (PVY), and cutworms are significant threats.",
    "**High production cost:** Labor, quality seed, and fertilizer costs can be significant.",
    "**Erratic rainfall and climate change impacts:** Unpredictable weather patterns can negatively affect potato yields.",
    "**Market volatility:** Fluctuating market prices can lead to financial losses.",
    "**Low productivity compared to potential:** Nepal's average potato yields are often lower than their potential."
  ],
  "best_season_and_time_for_this_crop": {
    "Terai region (e.g., Kailali)": "September - October (planting for winter crop - main season)",
    "Mid-hills (e.g., Lalitpur)": "August - November (planting for autumn/winter crop)",
    "High-hills": "December - February (planting for spring/summer crop)"
  },
  "is_this_best_season": {
    "value": "No, this is not the optimal season for a main potato crop in Kailali (Terai region) or generally for Lalitpur (mid-hills) on June 13th.",
    "reasoning": [
      "The primary potato season for Kailali district (Terai region) is the winter crop, planted in September-October. Planting in June means the crop will face peak monsoon rains and high temperatures, which are detrimental to potato growth and tuber formation, increasing disease pressure (e.g., late blight) and potentially leading to very low yields or crop failure.",
      "While some spring/early summer potatoes are grown in mid-hills like Lalitpur, June 13th is the onset of monsoon, bringing similar challenges of excess moisture and heat for tuber crops. For commercial ventures, this timing is not ideal for the main crop."
    ]
  },
  "total_avg_production_with_that_number_of_seed": {
    "value": "Approximately [min_kg] kg - [max_kg] kg (assuming average yield of 16.7 - 27.6 tonnes/hectare for Nepal)",
    "calculation": {
      "assumptions": [
        "Average potato yield in Nepal ranges from 16.7 metric tons/hectare (national average) to 27.6 metric tons/hectare (for improved varieties under good management)."
      ],
      "steps": [
        "Area = 0.2342 hectares.",
        "Minimum potential production = 0.2342 hectares * 16.7 tonnes/hectare.",
        "Maximum potential production = 0.2342 hectares * 27.6 tonnes/hectare.",
        "Convert tonnes to kg (1 tonne = 1000 kg)."
      ],
      "final_value": "Min: (0.2342 * 16.7 * 1000) kg, Max: (0.2342 * 27.6 * 1000) kg"
    }
  },
  "roi_total_profit_by_reducing_revenue_with_total_cost": {
    "estimated_revenue_min": {
      "value": "NPR [calculated_value]",
      "calculation": "Min production (from above) * Min future price (20 NPR/kg)."
    },
    "estimated_revenue_max": {
      "value": "NPR [calculated_value]",
      "calculation": "Max production (from above) * Max future price (30 NPR/kg)."
    },
    "estimated_revenue_avg": {
      "value": "NPR [calculated_value]",
      "calculation": "((Min production + Max production) / 2) * Avg future price (27 NPR/kg)."
    },
    "roi_min": {
      "value": "[calculated_percentage]%",
      "calculation": "((Estimated Revenue Min - Total Cost) / Total Cost) * 100%."
    },
    "roi_max": {
      "value": "[calculated_percentage]%",
      "calculation": "((Estimated Revenue Max - Total Cost) / Total Cost) * 100%."
    },
    "roi_avg": {
      "value": "[calculated_percentage]%",
      "calculation": "((Estimated Revenue Avg - Total Cost) / Total Cost) * 100%."
    },
    "net_profit_loss_min": {
      "value": "NPR [calculated_value]",
      "calculation": "Estimated Revenue Min - Total Cost."
    },
    "net_profit_loss_max": {
      "value": "NPR [calculated_value]",
      "calculation": "Estimated Revenue Max - Total Cost."
    },
    "net_profit_loss_avg": {
      "value": "NPR [calculated_value]",
      "calculation": "Estimated Revenue Avg - Total Cost."
    },
    "note": "While the calculations show potential for profit, it is **crucial to re-emphasize the impact of the suboptimal planting season (June 13th for Kailali/Terai).** This timing significantly increases the risk of lower actual yields and higher disease pressure, making the *actual ROI/profit highly likely to be much lower, potentially resulting in a loss*, if not planted in the optimal season."
  }
}


    `);
  // console.log(response);
  // Validate the input data
  if (!date || !season || !area || !crop || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const responseFromSoilApi = await fetch(
    `https://soil.narc.gov.np/soil/api/?lat=${location[0]}&lon=${location[1]}`
  );
  const soilData = await responseFromSoilApi.json();

  const priceApiRes = await axios.post(
    "http://127.0.0.1:5000/api/v2/predict_price",
    {
      Commodity: "bitter gourd",
      Date: "20-08-2027",
      Unit: "kgs",
    }
  );

  console.log("price prediction: ", priceApiRes);

  // Simulate report generation
  const report = {
    id: Date.now(),
    date,
    season,
    area,
    crop,
    location,
    soilData,
  };

  res.status(201).json(report);
};

const isCropLand = async (req, res) => {
  const { lat, lng } = req.query;

  // Validate the input coordinates
  if (!lat || !lng) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  const responseFromSoilApi = await fetch(
    `https://soil.narc.gov.np/soil/api/?lat=${lat}&lon=${lng}`
  );
  const soilData = await responseFromSoilApi.json();

  res.status(200).json(soilData);
};

export { generateReport, isCropLand };
