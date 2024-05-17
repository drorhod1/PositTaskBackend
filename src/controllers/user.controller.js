import { userService } from "../services/user.service.js";

class UserController {
  async getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await userService.getUser(userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getAllUsers(_, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
export const userController = new UserController();
