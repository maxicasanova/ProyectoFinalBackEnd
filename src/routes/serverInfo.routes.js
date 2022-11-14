import { checkAuthAdmin } from "../middlewares/checkAuth.js";
import express from "express";
import { serverinfoController } from "../controllers/index.controller.js";

const { getServerInfo } = serverinfoController;

const serverRouter = express.Router();

/* routing */
serverRouter.get("/", checkAuthAdmin, getServerInfo)

export default serverRouter;