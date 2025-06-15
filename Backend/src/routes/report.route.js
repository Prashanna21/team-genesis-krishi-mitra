import express from "express";
import {
  diseaseSolution,
  generateReport,
  isCropLand,
} from "../controllers/report.controller.js";

const reportRouter = express.Router();

reportRouter.post("/generate-report", generateReport);
reportRouter.get("/is-crop-land", isCropLand);
reportRouter.post("/disease-solution", diseaseSolution);

export default reportRouter;
