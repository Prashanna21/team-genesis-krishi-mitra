import express from "express";
import { getFarmerCart, saveFamerCart } from "../controllers/famerCart.controller.js";


const farmerCartRouter = express.Router();

farmerCartRouter.post("/form-crops", saveFamerCart);
farmerCartRouter.get("/market", getFarmerCart)

export default farmerCartRouter;
