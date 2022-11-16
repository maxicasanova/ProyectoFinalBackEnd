import { Router } from "express";
import cartRouter from "./cart.routes.js";
import chatRouter from "./chat.routes.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import orderRouter from "./order.routes.js";
import productRouter from "./product.routes.js";
import serverinfoRouter from "./serverInfo.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/user", userRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/chat", checkAuth, chatRouter);
router.use("/serverinfo", serverinfoRouter);
router.use('/order', orderRouter);

export default router;