import mongoose, { Schema } from "mongoose";

const farmerCartSchema = new mongoose.Schema({
 img:{
   type: String,
   required: false,
   default:"https://t4.ftcdn.net/jpg/00/69/19/09/240_F_69190946_dO9NYtUPGwAcKBR3pzeuwNkQy9bRCDbg.jpg",
 },
  location: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
},{timestamps: true});
const farmerCart = mongoose.model("farmerCart", farmerCartSchema);

export default farmerCart;
