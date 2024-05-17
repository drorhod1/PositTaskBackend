import express from "express";
import { werehouseController } from "../controllers/warehouses.controller.js";

const router = express.Router();

router.get("/", werehouseController.getAllwarehouses);

export default router;
