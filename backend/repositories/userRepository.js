const User = require("../models/user");

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

  async findAllUsers() {
    return await User.findAll();
  }
}

module.exports = new UserRepository();
