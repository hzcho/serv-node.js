import userRepository from "../repositories/userRepository.js";
import { BadRequestError } from "../errors/customErrors.js";

class UserService {
  async createUser(name, email) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestError("Пользователь с таким email уже существует");
    }
    return await userRepository.createUser(name, email);
  }

  async getAllUsers() {
    return await userRepository.getAllUsers();
  }
}

export default new UserService();
