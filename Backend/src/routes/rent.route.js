import express from "express";
import { getFormData, rentFormData } from "../controllers/rent.controller.js";

const rentRouter = express.Router();

rentRouter.post("/rent-data", rentFormData);
rentRouter.get("/get-data", getFormData);

export default rentRouter;
