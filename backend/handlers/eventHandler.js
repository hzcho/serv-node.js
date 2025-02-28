const eventService = require("../services/eventService");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении мероприятий" });
  }
};

const getEventById = async (req, res) => {
    try {
      const event = await eventService.getEventById(req.params.id);
      res.status(200).json(event);
    } catch (error) {
      console.error(error.message);
  
      if (error.message === "Некорректный ID") {
        return res.status(400).json({ message: "Некорректный ID" });
      }
  
      if (error.message === "Мероприятие не найдено") {
        return res.status(404).json({ message: "Мероприятие не найдено" });
      }
  
      res.status(500).json({ message: "Ошибка при получении мероприятия" });
    }
};

const createEvent = async (req, res) => {
    try {
        const event = await eventService.createEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        console.error(error.message);

        if (error.message === "Все обязательные поля должны быть заполнены") {
            return res.status(400).json({ message: "Все обязательные поля должны быть заполнены" });
        }

        if (error.message === "Некорректный UUID пользователя") {
            return res.status(400).json({ message: "Некорректный UUID пользователя" });
        }

        if (error.message === "Пользователь не найден") {
            return res.status(404).json({ message: "Пользователь не найден" });
        }

        res.status(500).json({ message: "Ошибка при создании мероприятия" });
    }
};

const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await eventService.updateEvent(req.params.id, req.body);
        res.status(200).json(updatedEvent);
    } catch (error) {
        if (error.message === "Некорректный ID") {
            return res.status(400).json({ message: "Некорректный ID" });
        }
        if (error.message === "Некорректный UUID пользователя") {
            return res.status(400).json({ message: "Некорректный UUID пользователя" });
        }
        if (error.message === "Пользователь не найден") {
            return res.status(400).json({ message: "Пользователь не найден" });
        }
        if (error.message === "Мероприятие не найдено") {
            return res.status(404).json({ message: "Мероприятие не найдено" });
        }
        if (error.message === "Нет данных для обновления") {
            return res.status(400).json({ message: "Нет данных для обновления" });
        }
        console.error(error);
        res.status(500).json({ message: "Ошибка при обновлении мероприятия" });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const response = await eventService.deleteEvent(req.params.id);
        res.status(200).json(response);
    } catch (error) {
        if (error.message === "Некорректный ID") {
            return res.status(400).json({ message: "Некорректный ID" });
        }
        if (error.message === "Мероприятие не найдено") {
            return res.status(404).json({ message: "Мероприятие не найдено" });
        }
        console.error(error);
        res.status(500).json({ message: "Ошибка при удалении мероприятия" });
    }
};

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
