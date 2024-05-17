import { customerService } from "../services/customer.service.js";

class CustomerController {
  async getAllCustomers(_, res) {
    try {
      const customers = await customerService.getAllCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
export const customerController = new CustomerController();
