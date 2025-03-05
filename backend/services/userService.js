const userRepository = require("../repositories/userRepository");
const { BadRequestError, NotFoundError } = require("../errors/customErrors");

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

module.exports = new UserService();