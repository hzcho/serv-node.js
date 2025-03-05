import User from "../models/user.js";

class UserRepository {
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async getUserById(id) {
    return await User.findByPk(id);
  }

  async createUser(name, email) {
    return await User.create({ name, email });
  }

  async getAllUsers() {
    return await User.findAll();
  }
}

export default new UserRepository();
