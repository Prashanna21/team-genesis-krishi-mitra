import express from "express";
import { generateReport } from "../controllers/report.controller.js";

const reportRouter = express.Router();

reportRouter.post("/generate-report", generateReport);

export default reportRouter;
