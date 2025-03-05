const eventRepository = require("../repositories/eventRepository");
const { validate: isUUID } = require("uuid");
const userRepository = require("../repositories/userRepository");
const { BadRequestError, NotFoundError } = require("../errors/customErrors");

class EventService {
  async getAllEvents() {
    return await eventRepository.getAllEvents();
  }

  async getEventById(id) {
    if (!isUUID(id)) {
      throw new BadRequestError("Некорректный ID");
    }
    const event = await eventRepository.getEventById(id);
    if (!event) {
      throw new NotFoundError("Мероприятие не найдено");
    }
    return event;
  }

  async createEvent(eventData) {
    const { title, description, date, location, createdBy } = eventData;

    if (!title || !date || !createdBy || !location) {
      throw new BadRequestError("Все обязательные поля должны быть заполнены");
    }

    if (!isUUID(createdBy)) {
      throw new BadRequestError("Некорректный UUID пользователя");
    }

    const userExists = await userRepository.getUserById(createdBy);
    if (!userExists) {
      throw new NotFoundError("Пользователь не найден");
    }

    return await eventRepository.createEvent({ title, description, date, location, createdBy });
  }

  async updateEvent(id, eventData) {
    if (!isUUID(id)) {
      throw new BadRequestError("Некорректный ID");
    }

    const event = await eventRepository.getEventById(id);
    if (!event) {
      throw new NotFoundError("Мероприятие не найдено");
    }

    const filteredData = Object.fromEntries(
      Object.entries(eventData).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(filteredData).length === 0) {
      throw new BadRequestError("Нет данных для обновления");
    }

    if (filteredData.createdBy) {
      if (!isUUID(filteredData.createdBy)) {
        throw new BadRequestError("Некорректный UUID пользователя");
      }

      const userExists = await userRepository.getUserById(filteredData.createdBy);
      if (!userExists) {
        throw new NotFoundError("Пользователь не найден");
      }
    }

    return await eventRepository.updateEvent(id, filteredData);
  }

  async deleteEvent(id) {
    if (!isUUID(id)) {
      throw new BadRequestError("Некорректный ID");
    }

    const deleted = await eventRepository.deleteEvent(id);
    if (!deleted) {
      throw new NotFoundError("Мероприятие не найдено");
    }

    return { message: "Мероприятие удалено" };
  }
}

module.exports = new EventService();
