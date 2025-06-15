import FarmerCart from "../models/farmerCart.model.js";

export const saveFamerCart = async (req, res) => {
  try {
    const { location, name, price, stock } = req?.body;

    if (!location || !name || !price || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCart = new FarmerCart({
      image: req?.file?.path?.replace("//", "/"),
      location,
      name,
      price,
      stock,
    });

    await newCart.save();
    res
      .status(201)
      .json({ message: "Farmer cart saved successfully", cart: newCart });
  } catch (error) {
    console.error("Error saving farmer cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFarmerCart = async (req, res) => {
  try {
    const carts = await FarmerCart.find();
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error fetching farmer cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
