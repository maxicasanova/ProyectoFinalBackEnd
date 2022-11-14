import { checkAuth } from "../middlewares/checkAuth.js";
import dotenv from 'dotenv';
import express from "express";
import upload from "../multer.js";
import { userController } from "../controllers/index.controller.js";

dotenv.config();
const userRouter = express.Router();

const {getLogged, logout, login, register} = userController;

/* routing */
userRouter.get("/logged", checkAuth, getLogged)

userRouter.get("/logout", logout)

userRouter.post("/login", login)

userRouter.post("/register", upload.single("avatar"), register)


export default userRouter;