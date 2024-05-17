import { DbService } from "../db/dbClient.js";

class WerehouseService {
  async getAllWarehouses() {
    try {
      const warehouses = await this.db.warehouses.findMany({});
      return warehouses;
    } catch (error) {
      console.error("Error fetching tickets:", error.message);
      throw error;
    }
  }
}
export const werehouseService = new WerehouseService();
