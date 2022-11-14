import { checkAuth } from "../middlewares/checkAuth.js";
import dotenv from 'dotenv';
import express from "express";

// import { userController } from "../controllers/index.controller.js"; 

// cambiar por chat router

dotenv.config();
const chatRouter = express.Router();

// const {getLogged, logout, login, register} = userController;

/* routing */
// chatRouter.get("/", checkAuth, getLogged)

// chatRouter.get("/:email", logout)

export default chatRouter;