import express from "express";
import { ticketController } from "../controllers/ticket.controller.js";
const router = express.Router();

router.get("/", ticketController.getAllTickets);
router.get("/employeeOfTheMonth", ticketController.getEmployeeOfTheMonth);
router.get("/byTechnician/:id", ticketController.getTicketsByTechId);
router.post("/", ticketController.createTicket);
router.patch("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);

export default router;
