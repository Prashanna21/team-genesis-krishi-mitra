import { gemini } from "../utility/geminiUse.js";
import axios from "axios";

const diseaseSolution = async (req, res) => {
  const { diseaseAndCropName } = req.body;

  if (!diseaseAndCropName) {
    return res
      .status(400)
      .json({ error: "Disease name and crop name are required" });
  }
  const prompt = `Solution for ${diseaseAndCropName.map(
    (crop) => `${crop} `
  )} give me in JSON format one one solution each by their crop key`;

  const response = await gemini(prompt);
  const cleanResponse = response.replace(/```json|```/g, "").trim();
  console.log("Clean Response: ", cleanResponse);
  return res.status(200).json({
    cleanResponse: JSON.parse(cleanResponse),
  });
};

const generateReport = async (req, res) => {
  const { date, season, area, location } = req.body;

  if (!date || !season || !area || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const responseFromSoilApi = await fetch(
    `https://soil.narc.gov.np/soil/api/?lat=${location[0]}&lon=${location[1]}`
  );
  const soilData = await responseFromSoilApi.json();

  const report = {
    id: Date.now(),
    date,
    season,
    area,
    location,
    soilData,
  };

  const suggestedCropAndTime = await gemini(`
I will give you a JSON input. Based on the region, season, and soil quality in it, suggest the best crop to plant.

👉 Only select from the crop list provided below.
👉 Only return **raw JSON**, no markdown, no extra formatting, no explanation.
👉 Follow this strict JSON format exactly:
{
  "suggestedCrop": "your_crop_name_from_list",
  "timeRequiredForCropToGrow": "day-month-year",
  "reasonForSelection": "reson for selection of the current crop with location reasoning"
}

Crop List:
"apple(fuji)", "apple(jholey)", "arum", "asparagus", "bakula", "bamboo shoot", "banana", "barela", "bauhania flower", "bitter gourd", "bottle gourd", "brd leaf mustard", "brinjal long", "brinjal round", "brocauli", "cabbage", "cabbage(local)", "cabbage(terai)", "capsicum", "carrot(local)", "carrot(terai)", "cauli local", "cauli local(jyapu)", "cauli terai", "celery", "chilli dry", "chilli green", "chilli green(akbare)", "chilli green(bullet)", "chilli green(machhe)", "christophine", "clive dry", "clive green", "coriander green", "cow pea(long)", "cowpea(short)", "cress leaf", "cucumber(hybrid)", "cucumber(local)", "drumstick", "fennel leaf", "fenugreek leaf", "fish fresh", "fish fresh(bachuwa)", "fish fresh(chhadi)", "fish fresh(mungari)", "fish fresh(rahu)", "french bean(hybrid)", "french bean(local)", "french bean(rajma)", "garlic dry chinese", "garlic dry nepali", "garlic green", "ginger", "grapes(black)", "grapes(green)", "green peas", "guava", "gundruk", "jack fruit", "kinnow", "kiwi", "knolkhol", "lemon", "lettuce", "lime", "litchi(indian)", "litchi(local)", "maize", "mandarin", "mango(calcutte)", "mango(chousa)", "mango(dushari)", "mango(maldah)", "mint", "mombin", "mushroom(button)", "mushroom(kanya)", "musk melon", "mustard leaf", "neuro", "okara", "onion dry (chinese)", "onion dry (indian)", "onion green", "orange(indian)", "orange(nepali)", "papaya(indian)", "papaya(nepali)", "parseley", "pear(chinese)", "pear(local)", "pineapple", "pointed gourd(local)", "pointed gourd(terai)", "pomegranate", "potato red", "potato red(indian)", "potato red(mude)", "potato white", "pumpkin", "raddish red", "raddish white(hybrid)", "raddish white(local)", "red cabbbage", "smooth gourd", "snake gourd", "soyabean green", "spinach leaf", "sponge gourd", "squash(long)", "squash(round)", "strawberry", "sugarbeet", "sugarcane", "sweet lime", "sweet orange", "sweet potato", "sword bean", "tamarind", "tofu", "tomato big(indian)", "tomato big(nepali)", "tomato small(indian)", "tomato small(local)", "tomato small(terai)", "tomato small(tunnel)", "turnip", "turnip a", "water melon(dotted)", "water melon(green)", "yam"

Here is the report:
${JSON.stringify(report)}
`);
  const cleanResponse = JSON.parse(
    suggestedCropAndTime.replace(/```json|```/g, "").trim()
  );

  console.log("suggested crop and time: ", cleanResponse);
  console.log("reson for selection: ", cleanResponse.reasonForSelection);

  const priceApiRes = await axios.post(
    "http://127.0.0.1:5000/api/v2/predict_price",
    {
      Commodity: cleanResponse.suggestedCrop,
      Date: cleanResponse.timeRequiredForCropToGrow,
      Unit: "kgs",
    }
  );

  const fullReport = {
    ...report,
    ...cleanResponse,
  };

  const response = await gemini(`
    You are an expert agricultural consultant specializing in crop economics and farm management in Nepal. **You are processing the provided farm data for what we provide data cultivation to generate a comprehensive report** in a specific JSON format, including detailed calculations and relevant agricultural advice.

    I'll provide you various use data like price prediction in future by running a model, geolocation, starting date of growing crop, geolocation by long and lat and also their soil quality like ph value and stuff and also season
we will also give you the best crop and reason for choosing it

**Input Data (JSON):**
${JSON.stringify(fullReport)}

output
**Output Data (JSON):**
{
 
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
        "Sum of direct costs =  Fertilizer Cost + Estimated Seed Cost",
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
  console.log(response);

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

export { generateReport, isCropLand, diseaseSolution };
