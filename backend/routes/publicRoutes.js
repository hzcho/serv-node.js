const express = require("express");
const {
  getAllEvents,
} = require("../handlers/eventHandler");

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-api-key
 * 
 * security:
 *   - ApiKeyAuth: []
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
router.get("/events", getAllEvents);

module.exports = router;
