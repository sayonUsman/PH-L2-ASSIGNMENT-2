import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post("/api/users", UserControllers.saveNewUserInfo);

export const UserRoutes = router;
