import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-api-key
 *       description: API Key для доступа к эндпоинтам
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: [Users]
 *     security:
 *       - ApiKeyAuth: []
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
router.post("/", (req, res) => UserController.createUser(req, res));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Получить список всех пользователей
 *     tags: [Users]
 *     security:
 *       - ApiKeyAuth: []
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
router.get("/", (req, res) => UserController.getUsers(req, res));

export default router;