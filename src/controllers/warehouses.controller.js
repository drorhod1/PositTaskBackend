import { werehouseService } from "../services/werehouse.service.js";

class WerehouseController {
  async getAllwarehouses(_, res) {
    try {
      const werehouses = await werehouseService.getAllWarehouses();
      res.json(werehouses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
export const werehouseController = new WerehouseController();
