import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/api/users", UserControllers.saveNewUserInfo);
router.get("/api/users", UserControllers.getAllUsers);
router.get("/api/users/:userId", UserControllers.getUser);
router.put("/api/users/:userId", UserControllers.updateAndSaveUserInfo);
router.delete("/api/users/:userId", UserControllers.deleteUser);
router.put("/api/users/:userId/orders", UserControllers.addOrderOrUpdateOrder);
router.get("/api/users/:userId/orders", UserControllers.getUserAllOrder);
router.get(
  "/api/users/:userId/orders/total-price",
  UserControllers.getUserTotalPriceOfOrder
);
export const UserRoutes = router;
