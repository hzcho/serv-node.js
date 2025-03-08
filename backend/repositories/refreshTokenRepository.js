import RefreshToken from "../models/refreshToken.js";

class RefreshTokenRepository {
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

export default new RefreshTokenRepository();