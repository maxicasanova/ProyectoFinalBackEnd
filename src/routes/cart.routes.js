import { checkAuth, checkAuthAdmin } from "../middlewares/checkAuth.js";

import { cartController } from "../controllers/index.controller.js";
import express from "express";

const { getAllCarts, getAllProductsByCartId, postProductByCartId, postCart, deleteCartById, emptyCartById, deleteProductByCartId } = cartController;

const cartRouter = express.Router();

/* routing */
cartRouter.post("/", checkAuth, postCart)
cartRouter.delete("/empty/:id", checkAuth, emptyCartById)
cartRouter.delete("/:id", checkAuthAdmin, deleteCartById)
cartRouter.get("/", checkAuthAdmin, getAllCarts)
cartRouter.get("/:id/productos", checkAuth, getAllProductsByCartId)
cartRouter.post("/:id/productos/:id_prod", checkAuth, postProductByCartId)
cartRouter.delete("/:id/productos/:id_prod", checkAuth, deleteProductByCartId)


export default cartRouter;