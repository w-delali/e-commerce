import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { errorHandler } from "../error-handler";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/products";
import { adminMiddleware } from "../middleware/admin";

const productRoutes: Router = Router();

productRoutes.get(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(listProducts),
);

productRoutes.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(getProductById),
);
productRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct),
);
productRoutes.patch(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(updateProduct),
);
productRoutes.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteProduct),
);
export default productRoutes;
