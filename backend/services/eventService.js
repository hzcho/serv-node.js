const eventRepository = require("../repositories/eventRepository");
const { validate: isUUID } = require("uuid");
const userRepository = require("../repositories/userRepository");

class EventService {
  async getAllEvents() {
    return await eventRepository.getAllEvents();
  }

  async getEventById(id) {
    const event = await eventRepository.getEventById(id);
    if (!event) {
      throw new Error("Мероприятие не найдено");
    }
    return event;
  }

async createEvent(eventData) {
    const { title, description, date, location, createdBy } = eventData;

    const userExists = await userRepository.getUserById(createdBy);

    if (!userExists) {
        throw new Error("Пользователь не найден");
    }

    return await eventRepository.createEvent({ title, description, date, location, createdBy });
}


async updateEvent(id, eventData) {
    const event = await eventRepository.getEventById(id);
    if (!event) {
        throw new Error("Мероприятие не найдено");
    }

    const filteredData = Object.fromEntries(
        Object.entries(eventData).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(filteredData).length === 0) {
        throw new Error("Нет данных для обновления");
    }

    if (filteredData.createdBy) {
        if (!isUUID(filteredData.createdBy)) {
            throw new Error("Некорректный UUID пользователя");
        }

        const userExists = await userRepository.getUserById(filteredData.createdBy);
        if (!userExists) {
            throw new Error("Пользователь не найден");
        }
    }

    return await eventRepository.updateEvent(id, filteredData);
}


  async deleteEvent(id) {
    const deleted = await eventRepository.deleteEvent(id);
    if (!deleted) {
        throw new Error("Мероприятие не найдено");
    }

    return { message: "Мероприятие удалено" };
}
}

module.exports = new EventService();
