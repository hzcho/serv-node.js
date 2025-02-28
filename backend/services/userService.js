const userRepository = require("../repositories/userRepository");

class UserService {
  async createUser(name, email) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Пользователь с таким email уже существует");
    }

    return await userRepository.createUser(name, email);
  }

  async getAllUsers() {
    return await userRepository.findAllUsers();
  }
}

module.exports = new UserService();
