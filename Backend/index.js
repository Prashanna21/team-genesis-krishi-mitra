import express from "express";
import { dbConnect } from "./src/lib/dbConnect.js";

const app = express();

app.listen(process.env.PORT, (req, res) => {
  dbConnect();
  console.log("Server is ready");
});
