const userService = require("../services/userService");

const createUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Имя и email обязательны для заполнения" });
  }

  try {
    const user = await userService.createUser(name, email);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === "Пользователь с таким email уже существует") {
      return res.status(400).json({ message: "Пользователь с таким email уже существует" });
    }
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании пользователя" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении списка пользователей" });
  }
};

module.exports = { createUser, getUsers };
