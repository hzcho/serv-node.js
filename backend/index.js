const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const { Event, User } = require("./models");
const { syncDB } = require("./models");
const setupSwagger = require('./swagger');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

setupSwagger(app);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Получить список событий
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "169a51b3-2727-4737-bae8-3f84bd2c396b"
 *                   title:
 *                     type: string
 *                     example: "Мероприятие в Москве"
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-03-01T00:00:00Z"
 */
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

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Получить информацию о мероприятии по ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID мероприятия
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Успешный ответ с данными мероприятия
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "169a51b3-2727-4737-bae8-3f84bd2c396b"
 *                 title:
 *                   type: string
 *                   example: "Мероприятие в Москве"
 *                 description:
 *                   type: string
 *                   example: "Описание мероприятия"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-01T00:00:00Z"
 *                 location:
 *                   type: string
 *                   example: "Москва, Красная площадь, 1"
 *                 createdBy:
 *                   type: string
 *                   format: uuid
 *                   example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
 *                     name:
 *                       type: string
 *                       example: "Иван Иванов"
 *                     email:
 *                       type: string
 *                       example: "ivan@example.com"
 *       404:
 *         description: Мероприятие не найдено
 *       500:
 *         description: Ошибка сервера
 */
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


/**
 * @swagger
 * /events:
 *   post:
 *     summary: Создать новое мероприятие
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - location
 *               - createdBy
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Конференция по IT"
 *               description:
 *                 type: string
 *                 example: "Мероприятие, посвященное последним технологиям"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-05-15T10:00:00Z"
 *               location:
 *                 type: string
 *                 example: "Москва, ул. Ленина, 12"
 *               createdBy:
 *                 type: string
 *                 format: uuid
 *                 example: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78"
 *     responses:
 *       201:
 *         description: Успешное создание мероприятия
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "169a51b3-2727-4737-bae8-3f84bd2c396b"
 *                 title:
 *                   type: string
 *                   example: "Конференция по IT"
 *                 description:
 *                   type: string
 *                   example: "Мероприятие, посвященное последним технологиям"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-15T10:00:00Z"
 *                 location:
 *                   type: string
 *                   example: "Москва, ул. Ленина, 12"
 *                 createdBy:
 *                   type: string
 *                   format: uuid
 *                   example: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78"
 *       400:
 *         description: Ошибка валидации входных данных
 *       500:
 *         description: Ошибка сервера
 */
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


/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Обновить существующее мероприятие
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID мероприятия, которое нужно обновить
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "169a51b3-2727-4737-bae8-3f84bd2c396b"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - date
 *               - location
 *               - createdBy
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Обновленная конференция по IT"
 *               description:
 *                 type: string
 *                 example: "Новое описание мероприятия"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-06-20T14:00:00Z"
 *               location:
 *                 type: string
 *                 example: "Санкт-Петербург, ул. Мира, 5"
 *               createdBy:
 *                 type: string
 *                 format: uuid
 *                 example: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78"
 *     responses:
 *       200:
 *         description: Успешное обновление мероприятия
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "169a51b3-2727-4737-bae8-3f84bd2c396b"
 *                 title:
 *                   type: string
 *                   example: "Обновленная конференция по IT"
 *                 description:
 *                   type: string
 *                   example: "Новое описание мероприятия"
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-20T14:00:00Z"
 *                 location:
 *                   type: string
 *                   example: "Санкт-Петербург, ул. Мира, 5"
 *                 createdBy:
 *                   type: string
 *                   format: uuid
 *                   example: "a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78"
 *       400:
 *         description: Ошибка валидации входных данных
 *       404:
 *         description: Мероприятие не найдено
 *       500:
 *         description: Ошибка сервера
 */
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


/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Удалить мероприятие
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: UUID мероприятия, которое нужно удалить
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "169a51b3-2727-4737-bae8-3f84bd2c396b"
 *     responses:
 *       200:
 *         description: Мероприятие успешно удалено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Мероприятие удалено"
 *       404:
 *         description: Мероприятие не найдено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Мероприятие не найдено"
 *       500:
 *         description: Ошибка сервера
 */
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


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Иван Иванов"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "ivan@example.com"
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "169a51b3-2727-4737-bae8-3f84bd2c396b"
 *                 name:
 *                   type: string
 *                   example: "Иван Иванов"
 *                 email:
 *                   type: string
 *                   example: "ivan@example.com"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-02-16T12:34:56Z"
 *       400:
 *         description: Ошибка валидации (отсутствуют поля или пользователь уже существует)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Имя и email обязательны для заполнения"
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка при создании пользователя"
 */
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


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить список всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "169a51b3-2727-4737-bae8-3f84bd2c396b"
 *                   name:
 *                     type: string
 *                     example: "Иван Иванов"
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: "ivan@example.com"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-02-16T12:34:56Z"
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ошибка при получении списка пользователей"
 */
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

