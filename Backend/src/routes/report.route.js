import express from "express";
import { generateReport, isCropLand } from "../controllers/report.controller.js";

const reportRouter = express.Router();

reportRouter.post("/generate-report", generateReport);
reportRouter.get("/is-crop-land", isCropLand)

export default reportRouter;
