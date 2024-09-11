import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";
import userRoutes from "./users";
import { cartsRoutes } from "./carts";
import { orderRoutes } from "./orders";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productRoutes);
rootRouter.use("/users", userRoutes);
rootRouter.use("/carts", cartsRoutes);
rootRouter.use("/orders", orderRoutes);

export default rootRouter;
