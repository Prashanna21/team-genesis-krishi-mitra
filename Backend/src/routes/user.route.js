import express from "express";
import { loginUser, saveUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/save-user", saveUser);
userRouter.post("/login", loginUser);

export default userRouter;
