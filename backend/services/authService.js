const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = "1h";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET не задан в переменных окружения");
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
      
        console.log("Введённый пароль:", password);
        console.log("Хеш из базы данных:", user.password);
      
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Неверный email или пароль");
        }
      
        const token = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRATION }
        );
      
        return token;
      }      
}

module.exports = new AuthService();
