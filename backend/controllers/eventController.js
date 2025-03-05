const eventService = require("../services/eventService");
const asyncHandler = require("../middlewares/asyncHandler");
const { handleError } = require("../errors/customErrors");

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
      const event = await eventService.getEventById(req.params.id);
      res.status(200).json(event);
    } catch (error) {
      handleError(res, error, "Ошибка при получении мероприятия");
    }
  });

  createEvent = asyncHandler(async (req, res) => {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      handleError(res, error, "Ошибка при создании мероприятия");
    }
  });

  updateEvent = asyncHandler(async (req, res) => {
    try {
      const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
      res.status(200).json(updatedEvent);
    } catch (error) {
      handleError(res, error, "Ошибка при обновлении мероприятия");
    }
  });

  deleteEvent = asyncHandler(async (req, res) => {
    try {
      const response = await eventService.deleteEvent(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      handleError(res, error, "Ошибка при удалении мероприятия");
    }
  });
}

module.exports = new EventController();