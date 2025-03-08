import authService from "../services/authService.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { handleError } from "../errors/customErrors.js";
import { BadRequestError } from "../errors/customErrors.js";

class AuthController {
  registerUser = asyncHandler(async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new BadRequestError("Все обязательные поля должны быть заполнены");
      }

      const user = await authService.registerUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      handleError(res, error, "Ошибка при регистрации пользователя");
    }
  });

  loginUser = asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new BadRequestError("Email и пароль обязательны");
      }

      const tokens = await authService.loginUser(email, password);
      res.status(200).json(tokens);
    } catch (error) {
      handleError(res, error, "Ошибка при входе в систему");
    }
  });

  refreshToken = asyncHandler(async (req, res) => {
    try {
      const { token } = req.body;

      if (!token) {
        throw new BadRequestError("Refresh token обязателен");
      }

      const newAccessToken = await authService.refreshToken(token);
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      handleError(res, error, "Ошибка при обновлении токена");
    }
  });
}

export default new AuthController();