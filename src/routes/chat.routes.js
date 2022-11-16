import path, { dirname } from 'path';

import { chatController } from "../controllers/index.controller.js";
import dotenv from 'dotenv';
import express from "express";
import { fileURLToPath } from 'url';

const {getChatsByMail} = chatController;

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const chatRouter = express.Router();


/* routing */

chatRouter.use("/", express.static(path.join(__dirname, '../../public')))

chatRouter.get("/:email", getChatsByMail)

export default chatRouter;