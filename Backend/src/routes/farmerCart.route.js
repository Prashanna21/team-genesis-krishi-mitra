import express from "express";
import {
  getFarmerCart,
  saveFamerCart,
} from "../controllers/famerCart.controller.js";
import upload from "../utility/multer.js";

const farmerCartRouter = express.Router();

farmerCartRouter.post("/form-crops", upload.single("image"), saveFamerCart);
farmerCartRouter.get("/market", getFarmerCart);

export default farmerCartRouter;
