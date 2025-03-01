const RefreshToken = require("../models/refreshToken");
const User = require("../models/user");

class AuthRepository {
  async saveRefreshToken(userId, token, expiresAt) {
    return await RefreshToken.create({ userId, token, expiresAt });
  }

  async findRefreshToken(token) {
    return await RefreshToken.findOne({ where: { token } });
  }

  async deleteRefreshToken(token) {
    return await RefreshToken.destroy({ where: { token } });
  }
}

module.exports = new AuthRepository();