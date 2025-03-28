import { Router } from "express";
import EventController from "../controllers/eventController.js";
import passport from "passport";

const router = new Router();

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Получить информацию о мероприятии по ID
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []
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

router.get('/:id',  passport.authenticate("jwt", { session: false }), EventController.getEventById);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Создать новое мероприятие
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []
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
router.post('/',  passport.authenticate("jwt", { session: false }), EventController.createEvent);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Обновить существующее мероприятие
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []
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
router.put('/:id',  passport.authenticate("jwt", { session: false }), EventController.updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Удалить мероприятие
 *     tags: [Events]
 *     security:
 *       - ApiKeyAuth: []
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
router.delete('/:id',  passport.authenticate("jwt", { session: false }), EventController.deleteEvent);

export default router;