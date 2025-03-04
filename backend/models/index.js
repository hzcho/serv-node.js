const { sequelize } = require("../config/db");
const User = require("./user"); //todo убрать двойной импорт/экспорт, импортировать напрямую с файла модели
const Event = require("./event");

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ База данных синхронизирована");
  } catch (error) {
    console.error("❌ Ошибка синхронизации:", error);
  }
};

module.exports = { syncDB, User, Event };

