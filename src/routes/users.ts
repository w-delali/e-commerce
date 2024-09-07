import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { addAddress, deleteAddress, listAddress } from "../controllers/users";
import { errorHandler } from "../error-handler";

const userRoutes = Router();

userRoutes.post("/address", [authMiddleware], errorHandler(addAddress));
userRoutes.get("/address", [authMiddleware], errorHandler(listAddress));
userRoutes.delete(
  "/address/:id",
  [authMiddleware],
  errorHandler(deleteAddress),
);
export default userRoutes;
