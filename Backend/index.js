import express from "express";
import { dbConnect } from "./src/lib/dbConnect.js";
import reportRouter from "./src/routes/report.route.js";
import cors from "cors";
import userRouter from "./src/routes/user.route.js";
import farmerCartRouter from "./src/routes/farmerCart.route.js";
import rentRouter from "./src/routes/rent.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/report", reportRouter);
app.use("/user", userRouter);
app.use("/farmer", farmerCartRouter);
app.use("/rent", rentRouter);

app.listen(process.env.PORT, () => {
  dbConnect();
  console.log("Server is ready");
});
