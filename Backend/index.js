import express from "express";
import { dbConnect } from "./src/lib/dbConnect.js";
import reportRouter from "./src/routes/report.route.js";
import cors from "cors";
import userRouter from "./src/routes/user.route.js";
import farmerCartRouter from "./src/routes/farmerCart.route.js";
import rentRouter from "./src/routes/rent.route.js";
import bodyParser from "body-parser";
import path from "path";
import { existsSync } from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const fullpath = path.join(process.cwd(), "uploads");
console.log("Uploads directory:", existsSync(fullpath));

app.use("/uploads", express.static(fullpath));

app.use("/report", reportRouter);
app.use("/user", userRouter);
app.use("/farmer", farmerCartRouter);
app.use("/rent", rentRouter);

app.listen(process.env.PORT || 3000, () => {
  dbConnect();
  console.log("Server is ready");
});
