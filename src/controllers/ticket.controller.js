import { ticketService } from "../services/ticket.service.js";

class TicketController {
  async getTicketsByTechId(req, res) {
    try {
      const technicianId = +req.params.id;
      const tickets = await ticketService.getTicketsByTechId(technicianId);
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllTickets(_, res) {
    try {
      const tickets = await ticketService.getAllTickets();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createTicket(req, res) {
    try {
      const ticketData = req.body;
      const createdTicket = await ticketService.createTicket(ticketData);
      if (!createdTicket) {
        res.status(400).json({ message: "One or more field are missing" });
      } else {
        res.json(createdTicket);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTicket(req, res) {
    try {
      const ticketId = req.params.id;
      const ticketData = req.body;
      if (!ticketData.id) {
        const updatedTicket = await ticketService.solveTicket(+req.params.id);
        res.json(updatedTicket);
      } else {
        const updatedTicket = await ticketService.updateTicket(
          ticketId,
          ticketData
        );
        res.json(updatedTicket);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTicket(req, res) {
    try {
      const ticketId = req.params.id;
      await ticketService.deleteTicket(+ticketId);
      res.json({ message: "Ticket deleted." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getEmployeeOfTheMonth(_, res) {
    try {
      const employee = await ticketService.getEmployeeOfTheMonth();
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const ticketController = new TicketController();
