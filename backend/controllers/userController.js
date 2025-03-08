import userService from "../services/userService.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { handleError } from "../errors/customErrors.js";

class UserController {
  createUser = asyncHandler(async (req, res) => {
    try {
      console.log(req.body);
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ message: "Имя и email обязательны для заполнения" });
      }

      const user = await userService.createUser(name, email);
      res.status(201).json(user);
    } catch (error) {
      handleError(res, error, "Ошибка при создании пользователя");
    }
  });

  getUsers = asyncHandler(async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      handleError(res, error, "Ошибка при получении списка пользователей");
    }
  });
}

export default new UserController();
