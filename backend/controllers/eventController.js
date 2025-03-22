import eventService from "../services/eventService.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { handleError } from "../errors/customErrors.js";
import { validate as isUUID } from "uuid";
import { BadRequestError } from "../errors/customErrors.js";

class EventController {
  getAllEvents = asyncHandler(async (req, res) => {
    try {
      const events = await eventService.getAllEvents();
      res.status(200).json(events);
    } catch (error) {
      handleError(res, error, "Ошибка при получении мероприятий");
    }
  });

  getEventById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        throw new BadRequestError("Некорректный ID");
      }
      const event = await eventService.getEventById(id);
      res.status(200).json(event);
    } catch (error) {
      handleError(res, error, "Ошибка при получении мероприятия");
    }
  });

  createEvent = asyncHandler(async (req, res) => {
    try {
      const { title, description, date, location, createdBy } = req.body;

      if (!title || !date || !createdBy || !location) {
        throw new BadRequestError("Все обязательные поля должны быть заполнены");
      }

      if (!isUUID(createdBy)) {
        throw new BadRequestError("Некорректный UUID пользователя");
      }

      const event = await eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      handleError(res, error, "Ошибка при создании мероприятия");
    }
  });

  updateEvent = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const eventData = req.body;

      if (!isUUID(id)) {
        throw new BadRequestError("Некорректный ID");
      }

      const filteredData = Object.fromEntries(
        Object.entries(eventData).filter(([_, value]) => value !== undefined)
      );

      if (Object.keys(filteredData).length === 0) {
        throw new BadRequestError("Нет данных для обновления");
      }

      if (filteredData.createdBy && !isUUID(filteredData.createdBy)) {
        throw new BadRequestError("Некорректный UUID пользователя");
      }

      const updatedEvent = await eventService.updateEvent(id, filteredData);
      res.status(200).json(updatedEvent);
    } catch (error) {
      handleError(res, error, "Ошибка при обновлении мероприятия");
    }
  });

  deleteEvent = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        throw new BadRequestError("Некорректный ID");
      }

      const response = await eventService.deleteEvent(id);
      res.status(200).json(response);
    } catch (error) {
      handleError(res, error, "Ошибка при удалении мероприятия");
    }
  });
}

export default new EventController();