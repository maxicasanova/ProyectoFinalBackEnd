import { chatController } from "../controllers/index.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import dotenv from 'dotenv';
import express from "express";

dotenv.config();

const chatRouter = express.Router();

const { getAllChats, getChatsByMail} = chatController;

/* routing */

chatRouter.get("/", checkAuth, getAllChats)

chatRouter.get("/:email", checkAuth, getChatsByMail)

export default chatRouter;