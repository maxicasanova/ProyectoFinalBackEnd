import { checkAuth } from "../middlewares/checkAuth.js";
import express from "express";
import { orderPost } from "../controllers/index.controller.js";

const orderRouter = express.Router();

/* routing */

orderRouter.post("/:id", checkAuth, orderPost)

export default orderRouter;