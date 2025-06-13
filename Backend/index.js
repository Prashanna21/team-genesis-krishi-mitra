import express from "express";
import { dbConnect } from "./src/lib/dbConnect.js";
import reportRouter from "./src/routes/report.route.js";
import cors from "cors";
import userRouter from "./src/routes/user.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/report", reportRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, (req, res) => {
  dbConnect();
  console.log("Server is ready");
});
