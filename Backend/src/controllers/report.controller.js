const generateReport = async (req, res) => {
    console.log(req.body);
  const { date, season, area, crop, location } = req.body;

  // Validate the input data
  if (!date || !season || !area || !crop || !location) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Simulate report generation
  const report = {
    id: Date.now(),
    date,
    season,
    area,
    crop,
    location,
  };

  console.log("Generated Report:", report);
  res.status(201).json(report);
};


export { generateReport };