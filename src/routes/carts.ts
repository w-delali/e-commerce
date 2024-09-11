import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { errorHandler } from "../error-handler";
import {
  addCartItem,
  changeItemQuantity,
  deleteCartItem,
  getCartItems,
} from "../controllers/carts";

const cartsRoutes = Router();

cartsRoutes.post("/", [authMiddleware], errorHandler(addCartItem));
cartsRoutes.get("/", [authMiddleware], errorHandler(getCartItems));
cartsRoutes.patch("/:id", [authMiddleware], errorHandler(changeItemQuantity));
cartsRoutes.delete("/:id", [authMiddleware], errorHandler(deleteCartItem));

export { cartsRoutes };
