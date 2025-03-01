const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const rtRepository = require("../repositories/refreshTokenRepository");
const { v4: uuidv4 } = require("uuid");

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESS_EXPIRATION = "15m";
const REFRESH_EXPIRATION_DAYS = 7;

if (!JWT_SECRET || !REFRESH_SECRET) {
  throw new Error("JWT_SECRET или REFRESH_SECRET не заданы в переменных окружения");
}

class AuthService {
  async registerUser(name, email, password) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Пользователь с таким email уже существует");
    }
    return await userRepository.createUser(name, email, password);
  }

  async loginUser(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Неверный email или пароль");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Неверный email или пароль");
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: ACCESS_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      REFRESH_SECRET,
      { expiresIn: `${REFRESH_EXPIRATION_DAYS}d` }
    );

    await rtRepository.saveRefreshToken(user.id, refreshToken, new Date(Date.now() + REFRESH_EXPIRATION_DAYS * 24 * 60 * 60 * 1000));

    return { accessToken, refreshToken };
  }

  async refreshToken(token) {
    const existingToken = await rtRepository.findRefreshToken(token);
    if (!existingToken) {
      throw new Error("Недействительный refresh token");
    }

    const decoded = jwt.verify(token, REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: decoded.id },
      JWT_SECRET,
      { expiresIn: ACCESS_EXPIRATION }
    );

    return newAccessToken;
  }
}

module.exports = new AuthService();