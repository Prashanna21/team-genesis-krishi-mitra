import { gemini } from "../utility/geminiUse.js";
import axios from "axios";

const predictPrice = async (req, res) => {
  const { Commodity, Date, Unit } = req.body;

  const priceApiRes = await axios.post(
    "http://127.0.0.1:5000/api/v2/predict_price",
    {
      Commodity,
      Date,
      Unit,
    }
  );

  console.log("Price API Response:", priceApiRes.data.data.Predicted);

  return res.status(200).json({
    price: priceApiRes.data.data.Predicted,
  });
};

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
${JSON.stringify(fullReport)} note: area is given in sq meter

also generate only practical data based on the data we provided and also generate the output based on the data we provided please
output this is only sample data you can generate based on the data we provided the output data should be exactly like this without any changes in format please

**Output Data (JSON):**
{
"id": 1749923708298,
"date": "2025-06-14",
"season": "Spring",
"area": 100,
"location": [27.6704711, 85.3317032],
"reasonForSelection": "Spring season and general soil conditions in the Kathmandu valley favour tomato growth, particularly the local variety which is adaptable to the region.",
"suggestedCrop": "give us the crop name that we provided",
"timeRequiredForCropToGrow": "01-09-2025",
"soilData": {
"result": " we will give and you generate out put based on data we provived "
},
"challenges_of_this_crop": [
"Poor availability of quality seed potato: A major constraint affecting productivity, leading to lower yields and disease susceptibility.",
"Lack of seed potato storage: Inadequate cold storage facilities lead to high post-harvest losses.",
"Disease and pest infestation: Late blight, bacterial wilt, Potato Virus Y (PVY), and cutworms are significant threats.",
"High production cost: Labor, quality seed, and fertilizer costs can be significant.",
"Erratic rainfall and climate change impacts: Unpredictable weather patterns can negatively affect potato yields.",
"Market volatility: Fluctuating market prices can lead to financial losses.",
"Low productivity compared to potential: Nepal's average potato yields are often lower than their potential."
],
"advices": [
"Consider raised beds for better drainage, especially given the silt-dominated soil and potential for waterlogging.",
"Incorporate organic matter into the soil to improve fertility and water retention. Aim for 20-30 tons of FYM/compost per hectare.",
"Monitor and manage pests and diseases, particularly late blight and potato tuber moth. Implement IPM strategies.",
"Monitor soil moisture and irrigate as needed, especially during tuber initiation. Avoid over- or under-watering."
],
"seed_price_in_nepal_and_total_seed_needed_in_that_area": {
"seed_price_per_kg_avg": "NPR 35.00 - 85.00 (depending on variety and quality)",
"total_seed_needed_kg": {
"min": 250,
"max": 300
},
"estimated_seed_cost": {
"min": "NPR 8750",
"max": "NPR 25500"
}
},
"fertilizer_cost": {
"value": "calculate the fertilizer cost based on the seed and area ",
"calculation": {
"urea": "NPR 1800",
"dap": "NPR 2200",
"mop": "NPR 1041.99"
}
},
"total_cost": {
"value": "NPR 7444.09 (approximately)",
"calculation": {
"fertilizer": "5041.99",
"seed": "2400",
"misc": "generate practical miscellanou cost accoridng to the data we provided"
}
},
"roi_total_profit_by_reducing_revenue_with_total_cost": {
"estimated_revenue_min": {
"price_per_kg": "NPR 30",
"yield": "388.60 kg",
"revenue": "NPR 11,658"
},
"estimated_revenue_max": {
"price_per_kg": "NPR 35",
"yield": "645.51 kg",
"revenue": "NPR 22,592.85"
},
"roi_min": "56.5%",
"roi_max": "203.4%",
"net_profit_loss_min": "NPR 4,213.91",
"net_profit_loss_max": "NPR 15,148.76"
},
"total_avg_production_with_that_number_of_seed": {
"value": "Approximately 388.60 kg - 645.51 kg (assuming average yield of 16.7 - 27.6 tonnes/hectare for Nepal)",
"calculation": {
"min_yield_t_per_ha": 16.7,
"max_yield_t_per_ha": 27.6
}
}
}


    `);

  const cleanDetailedResponse = JSON.parse(
    response.replace(/```json|```/g, "").trim()
  );

  res.status(201).json(cleanDetailedResponse);
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

export { generateReport, isCropLand, diseaseSolution, predictPrice };
