const Event = require("../models/event");
const User = require("../models/user");

class EventRepository {
  async getAllEvents() {
    return await Event.findAll({ include: User });
  }

  async getEventById(id) {
    return await Event.findByPk(id, { include: User });
  }

  async createEvent(eventData) {
    return await Event.create(eventData);
  }

  async getEventById(id) {
    return await Event.findByPk(id);
  }

  async updateEvent(id, eventData) {
      const event = await this.getEventById(id);
      if (!event) {
          return null;
      }

      return await event.update(eventData);
  }

  async deleteEvent(id) {
    const event = await Event.findByPk(id);
    if (!event) {
      return false;
    }

    await event.destroy();
    return true;
  }
}

module.exports = new EventRepository();