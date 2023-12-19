import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/api/users", UserControllers.saveNewUserInfo);
router.get("/api/users", UserControllers.getAllUsers);

export const UserRoutes = router;
