import { checkAuth, checkAuthAdmin } from "../middlewares/checkAuth.js";

import express from "express";
import { productController } from "../controllers/index.controller.js";

const { getProductById, postProduct, putProduct, deleteProductById, getProductsByCategory } = productController;

const productRouter = express.Router();

/* routing */
productRouter.get("/:id?", checkAuth, getProductById)
productRouter.post("/", checkAuthAdmin, postProduct)
productRouter.put("/:id", checkAuthAdmin, putProduct)
productRouter.delete("/:id", checkAuthAdmin, deleteProductById)
productRouter.get("/category/:category", checkAuth, getProductsByCategory)

export default productRouter;