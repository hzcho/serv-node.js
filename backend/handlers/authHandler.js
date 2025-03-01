const authService = require("../services/authService");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Имя, email и пароль обязательны" });
  }

  try {
    const user = await authService.registerUser(name, email, password);
    res.status(201).json({ message: "Регистрация успешна", user });
  } catch (error) {
    if (error.message === "Пользователь с таким email уже существует") {
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Ошибка при регистрации" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email и пароль обязательны" });
  }

  try {
    const token = await authService.loginUser(email, password);
    res.status(200).json({ message: "Вход успешен", token });
  } catch (error) {
    if (error.message === "Неверный email или пароль") {
      return res.status(401).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Ошибка при входе" });
  }
};

module.exports = { registerUser, loginUser };
