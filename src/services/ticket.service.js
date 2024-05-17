import { DbService } from "../db/dbClient.js";

class TicketService {
  constructor() {
    this.db = DbService.getInstance();
  }
  async getWarehouseName(id) {
    try {
      const warehouseName = await this.db.warehouses.findFirst({
        where: { id: id },
      });
      return warehouseName;
    } catch (error) {
      console.error("Error fetching warehouses:", error.message);
      throw error;
    }
  }
  async getTicketsByTechId(technicianId) {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const tickets = await this.db.tickets.findMany({
        where: {
          assigned_technician_id: technicianId,
          isResolved: false,
          created_at: {
            gte: new Date(currentDate),
            lt: new Date(
              new Date(currentDate).setDate(new Date(currentDate).getDate() + 1)
            ),
          },
        },
      });
      return tickets;
    } catch (error) {
      console.error("Error fetching tickets:", error.message);
      throw error;
    }
  }

  async getAllTickets() {
    try {
      const tickets = await this.db.tickets.findMany({
        where: {
          isResolved: false,
        },
      });
      const moddedTickets = await Promise.all(
        tickets.map(async (ticket) => {
          const warehouse = await this.getWarehouseName(ticket.warehouse_id);
          return { ...ticket, warehouse: warehouse.name };
        })
      );
      return moddedTickets;
    } catch (error) {
      console.error("Error fetching tickets:", error.message);
      throw error;
    }
  }

  updateTicket(ticketId, data) {
    try {
      return this.db.tickets.update({
        where: {
          id: ticketId,
        },
        data,
      });
    } catch (error) {
      console.error("Error updating ticket:", error.message);
      throw error;
    }
  }
  solveTicket(ticketId) {
    try {
      return this.db.tickets.update({
        where: {
          id: +ticketId,
        },
        data: {
          isResolved: true,
        },
      });
    } catch (error) {
      console.error("Error updating ticket:", error.message);
      throw error;
    }
  }

  async createTicket(ticketData) {
    try {
      const [mostAvialiableTech, availableWerehouse] = await Promise.all([
        this.getMostAvailableTech(),
        this.getAvailableWerehouse(ticketData.hardware_type),
      ]);

      const createdTicket = await this.db.$transaction(async (prisma) => {
        const ticket = await prisma.tickets.create({
          data: {
            ...ticketData,
            customer_id: +ticketData.customer_id,
            assigned_technician_id: mostAvialiableTech.id,
            warehouse_id: availableWerehouse,
          },
        });
        await this.updateWarehouseStock(
          ticketData.hardware_type,
          availableWerehouse,
          prisma
        );
        return ticket;
      });
      return createdTicket;
    } catch (error) {
      console.error("Error creating ticket:", error.message);
      throw error;
    }
  }

  deleteTicket(ticketId) {
    try {
      return this.db.tickets.delete({
        where: {
          id: ticketId,
        },
      });
    } catch (error) {
      console.error("Error deleting ticket:", error.message);
      throw error;
    }
  }

  async getMostAvailableTech() {
    try {
      const technicianWithLeastTickets = await this.db.technicians.findFirst({
        orderBy: {
          tickets: {
            _count: "asc",
          },
        },
      });

      if (technicianWithLeastTickets) {
        return technicianWithLeastTickets;
      } else {
        throw new Error("Did not found any technicians");
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async getEmployeeOfTheMonth() {
    const lastMonth = new Date();
    lastMonth.setDate(lastMonth.getDate() - 30);
    const formattedDate = lastMonth.toISOString().slice(0, 10);
    try {
      const technicians = await this.db.technicians.findFirst({
        where: {
          tickets: {
            some: {
              isResolved: true,
              date: {
                gte: formattedDate,
              },
            },
          },
        },
        orderBy: {
          tickets: {
            _count: "desc",
          },
        },
      });
      if (technicians) {
        return technicians;
      } else {
        throw new Error("Did not found any technicians");
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async getAvailableWerehouse(hardwareType) {
    try {
      const stockColumn = `${hardwareType}_stock`;
      const availableWerehouse = await this.db.warehouses.findFirst({
        where: {
          [stockColumn]: {
            gt: 0,
          },
        },
      });

      if (availableWerehouse) {
        return availableWerehouse.id;
      } else {
        throw new Error("Werehouses out of specific stock");
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async updateWarehouseStock(hardwareType, warehouseId, prisma) {
    try {
      const stockColumn = `${hardwareType}_stock`;
      await prisma.warehouses.update({
        where: {
          id: warehouseId,
        },
        data: {
          [stockColumn]: {
            decrement: 1,
          },
        },
      });
    } catch (error) {
      console.error("Error updating warehouse stock:", error.message);
      throw error;
    }
  }
}

export const ticketService = new TicketService();
