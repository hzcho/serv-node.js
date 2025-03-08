import eventRepository from "../repositories/eventRepository.js";
import userRepository from "../repositories/userRepository.js";
import { NotFoundError } from "../errors/customErrors.js";

class EventService {
  async getAllEvents() {
    return await eventRepository.getAllEvents();
  }

  async getEventById(id) {
    const event = await eventRepository.getEventById(id);
    if (!event) {
      throw new NotFoundError("Мероприятие не найдено");
    }
    return event;
  }

  async createEvent(eventData) {
    const { createdBy } = eventData;

    const userExists = await userRepository.getUserById(createdBy);
    if (!userExists) {
      throw new NotFoundError("Пользователь не найден");
    }

    return await eventRepository.createEvent(eventData);
  }

  async updateEvent(id, eventData) {
    const event = await eventRepository.getEventById(id);
    if (!event) {
      throw new NotFoundError("Мероприятие не найдено");
    }

    if (eventData.createdBy) {
      const userExists = await userRepository.getUserById(eventData.createdBy);
      if (!userExists) {
        throw new NotFoundError("Пользователь не найден");
      }
    }

    return await eventRepository.updateEvent(id, eventData);
  }

  async deleteEvent(id) {
    const deleted = await eventRepository.deleteEvent(id);
    if (!deleted) {
      throw new NotFoundError("Мероприятие не найдено");
    }
    return { message: "Мероприятие удалено" };
  }
}

export default new EventService();