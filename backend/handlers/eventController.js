const eventService = require("../services/eventService");
const asyncHandler = require("../middleware/asyncHandler");
const { ValidationError } = require("../middleware/validationError");

const getAllEvents = asyncHandler(async (req, res) => {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
});

const getEventById = asyncHandler(async (req, res) => {
    const event = await eventService.getEventById(req.params.id);

    if (!event) {
        throw new ValidationError(404, "Мероприятие не найдено");
    }

    res.status(200).json(event);
});

const createEvent = asyncHandler(async (req, res) => {
    const { title, date, createdBy, location } = req.body;

    if (!title || !date || !createdBy || !location) {
        throw new ValidationError(400, "Все обязательные поля должны быть заполнены");
    }

    const event = await eventService.createEvent(req.body);
    res.status(201).json(event);
});

const updateEvent = asyncHandler(async (req, res) => {
    const updatedEvent = await eventService.updateEvent(req.params.id, req.body);

    if (!updatedEvent) {
        throw new ValidationError(404, "Мероприятие не найдено");
    }

    res.status(200).json(updatedEvent);
});

const deleteEvent = asyncHandler(async (req, res) => {
    const response = await eventService.deleteEvent(req.params.id);

    if (!response) {
        throw new ValidationError(404, "Мероприятие не найдено");
    }

    res.status(200).json(response);
});

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
