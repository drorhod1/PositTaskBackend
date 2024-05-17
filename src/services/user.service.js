import { DbService } from "../db/dbClient.js";

class UserService {
  constructor() {
    this.db = DbService.getInstance();
  }
  async getUser(userId) {
    return this.db.technicians.findUnique({
      where: {
        id: +userId,
      },
    });
  }
  async getAllUsers() {
    return this.db.technicians.findMany({});
  }
}
export const userService = new UserService();
