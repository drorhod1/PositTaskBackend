import { DbService } from "../db/dbClient.js";

class CustomerService {
  constructor() {
    this.db = DbService.getInstance();
  }
  async getAllCustomers() {
    return this.db.customers.findMany({});
  }
}
export const customerService = new CustomerService();
