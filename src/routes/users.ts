import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  addAddress,
  deleteAddress,
  listAddress,
  updateUser,
} from "../controllers/users";
import { errorHandler } from "../error-handler";

const userRoutes = Router();

userRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
userRoutes.get("/address", [authMiddleware], errorHandler(listAddress));
userRoutes.patch("/address", [authMiddleware], errorHandler(updateUser));
userRoutes.delete(
  "/address/:id",
  [authMiddleware],
  errorHandler(deleteAddress),
);
export default userRoutes;
