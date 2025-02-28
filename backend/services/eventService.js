const eventRepository = require("../repositories/eventRepository");
const { validate: isUUID } = require("uuid");

class EventService {
  async getAllEvents() {
    return await eventRepository.getAllEvents();
  }

  async getEventById(id) {
    if (!isUUID(id)) {
      throw new Error("Некорректный ID");
    }
    const event = await eventRepository.getEventById(id);
    if (!event) {
      throw new Error("Мероприятие не найдено");
    }
    return event;
  }

  async createEvent(eventData) {
    const { title, description, date, location, createdBy } = eventData;

    if (!title || !date || !createdBy || !location) {
      throw new Error("Все обязательные поля должны быть заполнены");
    }

    return await eventRepository.createEvent({ title, description, date, location, createdBy });
  }

  async updateEvent(id, eventData) {
    const { title, date, createdBy, location } = eventData;

    if (!title || !date || !createdBy || !location) {
      throw new Error("Все обязательные поля должны быть заполнены");
    }

    const updatedEvent = await eventRepository.updateEvent(id, eventData);
    if (!updatedEvent) {
      throw new Error("Мероприятие не найдено");
    }

    return updatedEvent;
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
