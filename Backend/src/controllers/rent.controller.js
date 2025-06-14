import Rent from "../models/rent.model.js";

const rentFormData = async (req, res) => {
  try {
    const { Name, Vehicle, location, rentPrice } = req.body;

    // Validate required fields
    if (!Name || !Vehicle || !location || !rentPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new rent entry
    const newRent = new Rent({
      Name,
      Vehicle,
      location,
      rentPrice,
    });

    // Save the rent entry to the database
    await newRent.save();
    res
      .status(201)
      .json({ message: "Rent entry created successfully", data: newRent });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFormData = async (req, res) => {
  try {
    const rentData = await Rent.find({});
    console.log("Rent Data:", rentData);

    res
      .status(200)
      .json({ message: "Rent data retrieved successfully", data: rentData });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { rentFormData, getFormData };
