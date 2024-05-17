import express from "express";
import { userController } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/:id", userController.getUser);
router.get("/", userController.getAllUsers);

export default router;
