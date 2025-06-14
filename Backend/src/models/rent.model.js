import mongoose, { Schema } from "mongoose";

const rentSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Vehicle: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rentPrice: {
    type: Number,
    required: true,
  },
});
const Rent = mongoose.model("Rent", rentSchema);

export default Rent;
