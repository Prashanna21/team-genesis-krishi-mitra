import express from "express";
import {
  diseaseSolution,
  generateReport,
  isCropLand,
  predictPrice,
} from "../controllers/report.controller.js";

const reportRouter = express.Router();

reportRouter.post("/generate-report", generateReport);
reportRouter.get("/is-crop-land", isCropLand);
reportRouter.post("/disease-solution", diseaseSolution);
reportRouter.post("/predict-price", predictPrice);

export default reportRouter;
