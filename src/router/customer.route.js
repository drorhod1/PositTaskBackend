import express from "express";
import { customerController } from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/", customerController.getAllCustomers);

export default router;
