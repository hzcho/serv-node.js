const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const { Event, User } = require("./models");
const { syncDB } = require("./models");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/events", async (req, res) => {
  try {
    const events = await Event.findAll({
      include: User,
    });
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении мероприятий" });
  }
});

app.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: User,
    });
    if (!event) {
      return res.status(404).json({ message: "Мероприятие не найдено" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении мероприятия" });
  }
});

app.post("/events", async (req, res) => {
  const { title, description, date, location, createdBy } = req.body;

  if (!title || !date || !createdBy || !location) {
    return res.status(400).json({ message: "Все обязательные поля должны быть заполнены" });
  }

  try {
    const event = await Event.create({
      title,
      description,
      date,
      location, 
      createdBy,
    });
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании мероприятия" });
  }
});

app.put("/events/:id", async (req, res) => {
  const { title, description, date, location, createdBy } = req.body;

  if (!title || !date || !createdBy || !location) {
    return res.status(400).json({ message: "Все обязательные поля должны быть заполнены" });
  }

  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Мероприятие не найдено" });
    }
    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
    event.createdBy = createdBy;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при обновлении мероприятия" });
  }
});

app.delete("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Мероприятие не найдено" });
    }

    await event.destroy();
    res.status(200).json({ message: "Мероприятие удалено" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при удалении мероприятия" });
  }
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Имя и email обязательны для заполнения" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Пользователь с таким email уже существует" });
    }

    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при создании пользователя" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении списка пользователей" });
  }
});


const startServer = async () => {
  try {
    await connectDB();
    await syncDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Ошибка при запуске сервера:", error);
  }
};

startServer();

